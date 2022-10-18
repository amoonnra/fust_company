const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateUserData } = require('../utils/helpers');
const tokenService = require('../services/tokenService');
const chalk = require('chalk');
const { check, validationResult } = require('express-validator');

router.post('/signUp', [
	check('email', 'Не корректная эл. почта').isEmail(),
	check(
		'password',
		'Пароль должен быть больше 8 символов и меньше 30'
	).isLength({ min: 8, max: 30 }),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					error: {
						message: 'INVALID_DATA',
						code: 400,
						errors: errors.array(),
					},
				});
			}
			const { email, password } = req.body;
			const exsistingUser = await User.findOne({ email });

			if (exsistingUser) {
				return res.status(400).json({
					error: {
						message: 'EMAIL_EXISTS',
						code: 400,
					},
				});
			}

			const hashedPassword = await bcrypt.hash(password, 12);
			const newUser = await User.create({
				...generateUserData(),
				...req.body,
				password: hashedPassword,
			});

			const tokens = tokenService.generate({ _id: newUser._id });
			await tokenService.save(newUser._id, tokens.refreshToken);

			res.status(201).send({ ...tokens, userId: newUser._id });
		} catch (e) {
			res.status(500).send({
				message: 'На сервере произошла ошибка 500',
			});
			console.log(chalk.red(e.stack));
		}
	},
]);

router.post('/signInWithPassword', [
	check('email', 'Email is not correct').normalizeEmail().isEmail(),
	check('password', 'Password can not be empty').exists(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					error: {
						message: 'INVALID_DATA',
						code: 400,
						errors: errors.array(),
					},
				});
			}

			const { email, password } = req.body;
			const exsistingUser = await User.findOne({ email });

			if (!exsistingUser) {
				return res.status(400).json({
					error: {
						message: 'EMAIL_NOT_FOUND',
						code: 400,
					},
				});
			}

			const isPasswordEqual = await bcrypt.compare(
				password,
				exsistingUser.password
			);

			if (!isPasswordEqual) {
				return res.status(400).json({
					error: {
						message: 'INVALID_PASSWORD',
						code: 400,
					},
				});
			}
			const tokens = tokenService.generate({ _id: exsistingUser._id });
			await tokenService.save(exsistingUser._id, tokens.refreshToken);

			res.status(200).send({ ...tokens, userId: exsistingUser._id });
		} catch (e) {
			res.status(500).send({
				message: 'На сервере произошла ошибка 500',
			});
			console.log(chalk.red(e.stack));
		}
	},
]);

function isTokenInvalid(data, dbToken) {
	return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post('/token', async (req, res) => {
	try {
		const { refresh_token: refreshToken } = req.body;
		const data = tokenService.validateRefresh(refreshToken);
		const dbToken = await tokenService.findToken(refreshToken);

		if (isTokenInvalid(data, dbToken)) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const tokens = tokenService.generate({ _id: data._id });
		await tokenService.save(data._id, tokens.refreshToken);

		res.status(201).send({ ...tokens, userId: data._id });
	} catch (e) {
		res.status(500).send({
			message: 'На сервере произошла ошибка 500',
		});
		console.log(chalk.red(e.stack));
	}
});

module.exports = router;

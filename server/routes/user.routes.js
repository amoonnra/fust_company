const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

router
	.route('/:userId')
	.patch(auth, async (req, res) => {
		try {
			const { userId } = req.params;

			if (userId === req.user._id) {
				const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
					new: true,
				});
				res.send(updatedUser);
			} else {
				res.status(401).json({ message: 'Unauthorized' });
			}
		} catch (e) {
			res.status(500).send({
				message: 'На сервере произошла ошибка 500',
			});
			console.log(chalk.red(e.stack));
		}
	})
	.get(auth, async (req, res) => {
		try {
			const { userId } = req.params;

			const chosenUser = await User.findById(userId);
			res.send(chosenUser);
		} catch (e) {
			res.status(500).send({
				message: 'На сервере произошла ошибка 500',
			});
			console.log(chalk.red(e.stack));
		}
	});

router.get('/', auth, async (req, res) => {
	try {
		const list = await User.find();
		res.send(list);
	} catch (e) {
		res.status(500).send({
			message: 'На сервере произошла ошибка 500',
		});
		console.log(chalk.red(e.stack));
	}
});

module.exports = router;

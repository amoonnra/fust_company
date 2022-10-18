const express = require('express');
const Quality = require('../models/Quality');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const list = await Quality.find();
		res.status(200).send(list);
	} catch (e) {
		res.status(500).send({
			message: 'На сервере произошла ошибка 500',
		});
	}
});

module.exports = router;

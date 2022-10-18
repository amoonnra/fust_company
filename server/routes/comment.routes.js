const express = require('express');
const router = express.Router({ mergeParams: true });
const Comment = require('../models/Comment');
const auth = require('../middleware/authMiddleware');

router
	.route('/')
	.get(auth, async (req, res) => {
		try {
			const { orderBy, equalTo } = req.query;
			const list = await Comment.find({ [orderBy]: equalTo });
			res.send(list);
		} catch (e) {
			console.log(e);
		}
	})
	.post(auth, async (req, res) => {
		try {
			const newComment = await Comment.create({
				...req.body,
				userId: req.user._id,
			});
			res.status(201).send(newComment);
		} catch (e) {
			console.log(e);
		}
	});

router.delete('/:commentId', auth, async (req, res) => {
	try {
		const { commentId } = req.params;
		const removedComment = await Comment.findById(commentId);
		console.log(removedComment.userId);
		if (removedComment.userId.toString() === req.user._id) {
			await removedComment.remove();
			res.status(201).send(null);
		} else {
			return res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;

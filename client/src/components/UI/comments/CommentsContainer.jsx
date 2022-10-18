import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	loadCommentsList,
	createComment,
	removeComment,
} from '../../../store/comments';
import { getCurrentUserId } from '../../../store/users';

const CommentsContainer = ({ children, thisPageId, users }) => {
	const dispatch = useDispatch();
	const currentUserId = useSelector(getCurrentUserId());
	useEffect(() => {
		dispatch(loadCommentsList(thisPageId));
	}, [thisPageId]);

	const handleDelete = (id) => {
		dispatch(removeComment(id));
	};
	const handleSubmit = (data) => {
		dispatch(
			createComment({ ...data, userId: currentUserId, pageId: thisPageId })
		);
	};

	const clonedChildren = React.Children.map(children, (child) => {
		if (!child) return;
		let config = {
			...child.props,
			users,
			thisPageId,
			onSubmit: handleSubmit,
			onDelete: handleDelete,
		};
		return React.cloneElement(child, config);
	});
	return clonedChildren;
};

export default CommentsContainer;

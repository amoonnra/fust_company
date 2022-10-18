import React, { useEffect, useState } from 'react';
import Card from '../Card';
import CommentItem from './CommentItem';
import { useSelector } from 'react-redux';
import { getCommentsLoadingStatus, getComments } from '../../../store/comments';

const CommentsCard = ({ id: pageId, user, onDelete }) => {
	const isLoading = useSelector(getCommentsLoadingStatus());
	const commentsOnPage = useSelector(getComments());
	if (commentsOnPage?.length) {
		return (
			<Card title="Comments" isContent>
				<hr />
				{commentsOnPage.map((comment) => {
					return (
						<CommentItem
							key={comment._id}
							userId={comment.userId}
							time={comment.created_at}
							commentText={comment.content}
							onDelete={() => onDelete(comment._id)}
						/>
					);
				})}
			</Card>
		);
	}
	return null;
};

export default CommentsCard;

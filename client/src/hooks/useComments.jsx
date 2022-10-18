import React, { useContext, useEffect, useState } from 'react';
import commentsService from '../services/commentsService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { getCurrentUserId } from '../store/users';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

const CommentsContext = React.createContext();

export const useComments = () => {
	return useContext(CommentsContext);
};

const CommentsProvider = ({ children }) => {
	const { id: pageId } = useParams();
	const currentUserId = useSelector(getCurrentUserId());
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	useEffect(() => {
		getComments();
	}, [pageId]);

	async function createComment(data) {
		const comment = {
			...data,
			_id: nanoid(),
			pageId,
			userId: currentUserId,
			created_at: Date.now(),
		};
		try {
			const { content } = await commentsService.create(comment);
			setComments((prevState) => [...prevState, content]);
		} catch (err) {
			errorCatcher(err);
		}
	}

	async function getComments() {
		try {
			const { content } = await commentsService.get(pageId);
			setComments(content);
		} catch (err) {
			errorCatcher(err);
		} finally {
			setIsLoading(false);
		}
	}

	async function removeComment(id) {
		try {
			const { content } = await commentsService.remove(id);
			setComments((comments) => comments.filter((c) => c._id !== id));
		} catch (err) {
			errorCatcher(err);
		} finally {
			setIsLoading(false);
		}
	}

	function errorCatcher(error) {
		const { message } = error.response.data;
		setError(message);
	}

	return (
		<CommentsContext.Provider
			value={{ comments, createComment, isLoading, removeComment }}
		>
			{!isLoading ? children : 'Loading...'}
		</CommentsContext.Provider>
	);
};

export default CommentsProvider;

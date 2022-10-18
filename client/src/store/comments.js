import { createAction, createSlice } from '@reduxjs/toolkit';
import professionService from '../services/professionService';
import commentsService from '../services/commentsService';

const commentsSlice = createSlice({
	name: 'comments',
	initialState: {
		entities: [],
		isLoading: true,
		error: null,
	},
	reducers: {
		commentsRequested(state) {
			state.isLoading = true;
		},
		commentsRequestFailed(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
		commentsRecieved(state, action) {
			state.isLoading = false;
			state.entities = action.payload;
		},
		commentAdded(state, action) {
			state.entities.push({ ...action.payload });
		},
		commentRemoved(state, action) {
			state.entities = state.entities.filter((c) => c._id !== action.payload);
		},
	},
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
	commentsRequested,
	commentsRequestFailed,
	commentAdded,
	commentsRecieved,
	commentRemoved,
} = actions;

const commentAddRequested = createAction('comments/commentAddRequested');
const commentRemoveRequested = createAction('comments/commentRemoveRequested');
const commentAddRequestFailed = createAction(
	'comments/commentAddRequestFailed'
);

export const loadCommentsList = (pageId) => async (dispatch) => {
	dispatch(commentsRequested());
	try {
		const { content } = await commentsService.get(pageId);
		dispatch(commentsRecieved(content));
	} catch (error) {
		dispatch(commentsRequestFailed(error.message));
	}
};

export const createComment = (payload) => async (dispatch, state) => {
	dispatch(commentAddRequested());
	try {
		const { content } = await commentsService.create(payload);
		dispatch(commentAdded(content));
	} catch (err) {
		dispatch(commentAddRequestFailed(err.message));
	}
};

export const removeComment = (id) => async (dispatch) => {
	dispatch(commentRemoveRequested());
	try {
		await commentsService.remove(id);
		dispatch(commentRemoved(id));
	} catch (err) {
		dispatch(commentsRequestFailed(err.message));
	}
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
	state.comments.isLoading;

export default commentsReducer;

import { createAction, createSlice } from '@reduxjs/toolkit';
import userService from '../services/userService';
import authService from '../services/authService';
import localStorageService from '../services/localStorageService';
import randomInt from '../utils/getRandomInt';
import generateAuthError from '../utils/generateAuthError';
import { push } from 'react-router-redux';

const initialState = !localStorageService.getAccessToken()
	? {
			entities: [],
			isLoading: false,
			error: null,
			lastFetch: null,
			auth: null,
			isLoggedIn: false,
			dataLoaded: false,
	  }
	: {
			entities: [],
			isLoading: true,
			error: null,
			lastFetch: null,
			auth: { userId: localStorageService.getUserID() },
			isLoggedIn: true,
			dataLoaded: false,
	  };

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		usersRequested(state) {
			state.isLoading = true;
		},
		usersRequestFailed(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
		usersRecieved(state, action) {
			state.isLoading = false;
			state.entities = action.payload;
			state.dataLoaded = true;
			state.lastFetch = Date.now();
		},
		authRequested(state, action) {
			state.error = null;
		},
		authRequestSuccess(state, action) {
			state.auth = { ...action.payload };
			state.isLoggedIn = true;
		},
		authRequestFailed(state, action) {
			state.error = action.payload;
		},
		userUpdateSuccess(state, action) {
			const currentUserIndex = state.entities.findIndex(
				(u) => u._id === state.auth.userId
			);
			state.entities[currentUserIndex] = { ...action.payload };
		},
		authCleared(state) {
			state.auth = null;
			state.users = [];
			state.isLoggedIn = false;
		},
		userCreated(state, action) {
			state.entities.push(action.payload);
		},
	},
});

const { actions, reducer: usersReducer } = usersSlice;
const {
	usersRequested,
	usersRequestFailed,
	usersRecieved,
	authRequestSuccess,
	authRequestFailed,
	authCleared,
	userCreated,
	userUpdateSuccess,
	authRequested,
} = actions;

const userUpdateRequested = createAction('user/userUpdateRequested');
const userUpdateFailed = createAction('user/userUpdateFailed');
const userCreateRequested = createAction('user/userCreateRequested');
const userCreateRequestFailed = createAction('user/userCreateRequestFailed');

export const loadUsersList = () => async (dispatch, getState) => {
	const { lastFetch } = getState().users;
	if (isOutdated(lastFetch)) {
		dispatch(usersRequested());
		try {
			const { content } = await userService.get();
			dispatch(usersRecieved(content));
		} catch (error) {
			dispatch(usersRequestFailed(error.message));
		}
	}
};

export const signUp = (payload) => async (dispatch) => {
	dispatch(authRequested());
	try {
		const data = await authService.register(payload);
		localStorageService.setTokens(data);
		dispatch(authRequestSuccess({ userId: data.userId }));
		dispatch(push('/users'));
		return true;
	} catch (error) {
		const { code, message } = error.response.data.error;
		if (code === 400) {
			const errorMessage = generateAuthError(message);
			dispatch(authRequestFailed(errorMessage));
			dispatch(loadUsersList());
		} else {
			dispatch(authRequestFailed(error.message));
		}
	}
};

export const signIn = (payload) => async (dispatch) => {
	const { password, email } = payload;

	dispatch(authRequested());
	try {
		const data = await authService.signin({ password, email });
		localStorageService.setTokens(data);
		dispatch(authRequestSuccess({ userId: data.userId }));
		dispatch(push('/users'));
		return true;
	} catch (error) {
		const { code, message } = error.response.data.error;
		if (code === 400) {
			const errorMessage = generateAuthError(message);
			dispatch(authRequestFailed(errorMessage));
		} else {
			dispatch(authRequestFailed(error.message));
		}
	}
};

export const logOut = () => (dispatch) => {
	localStorageService.removeAccessTokens();
	dispatch(authCleared());
};

export const updateUserData = (payload) => async (dispatch) => {
	dispatch(userUpdateRequested());
	try {
		const { content } = await userService.update(
			payload,
			localStorageService.getUserID()
		);
		dispatch(userUpdateSuccess(content));
	} catch (error) {
		dispatch(userUpdateFailed(error.message));
	}
};

export const getRequestError = () => (state) => state.users.error;
export const getUsersList = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getUserById = (userId) => (state) =>
	state.users.entities.find((u) => u._id === userId);

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserData = () => (state) =>
	state.users.entities.find((u) => {
		return u._id === state.users.auth?.userId;
	});
export const getCurrentUserId = () => (state) => state.users.auth?.userId;

function createUser(payload) {
	return async function (dispatch) {
		dispatch(userCreateRequested);
		try {
			const { content } = await userService.create(payload);
			dispatch(userCreated(content));
		} catch (error) {
			dispatch(userCreateRequestFailed(error.message));
		}
	};
}

function isOutdated(date) {
	if (Date.now() - date > 10 * 60 * 1000) return true;
	return false;
}

export default usersReducer;

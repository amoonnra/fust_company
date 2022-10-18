import { configureStore, combineReducers } from '@reduxjs/toolkit';
import qualitiesReducer from './qualities';
import professionsReducer from './professions';
import usersReducer from './users';
import commentsReducer from './comments';
import { logger } from './logger';
const rootReducer = combineReducers({
	qualities: qualitiesReducer,
	professions: professionsReducer,
	users: usersReducer,
	comments: commentsReducer,
});

function createStore() {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(logger),
		devTools: process.env.NODE_ENV !== 'production',
	});
}

export default createStore;

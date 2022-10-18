import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/professionService';

const professionsSlice = createSlice({
	name: 'professions',
	initialState: {
		entities: [],
		isLoading: true,
		error: null,
		lastFetch: null,
	},
	reducers: {
		professionsRequested(state) {
			state.isLoading = true;
		},
		professionsRequestFailed(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
		professionsRecieved(state, action) {
			state.isLoading = false;
			state.entities = action.payload;
			state.lastFetch = Date.now();
		},
	},
});

const { actions, reducer: professionsReducer } = professionsSlice;
const { professionsRequested, professionsRequestFailed, professionsRecieved } =
	actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
	const { lastFetch } = getState().professions;
	if (isOutdated(lastFetch)) {
		dispatch(professionsRequested());
		try {
			const { content } = await professionService.get();
			dispatch(professionsRecieved(content));
		} catch (error) {
			dispatch(professionsRequestFailed(error.message));
		}
	}
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
	state.professions.isLoading;
export const getProfessionById = (id) => (state) => {
	console.log(id, state.professions);
	return state.professions.entities.find((p) => p._id === id);
};

function isOutdated(date) {
	if (Date.now() - date > 10 * 60 * 1000) return true;
	return false;
}

export default professionsReducer;

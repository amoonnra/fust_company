import { createSlice } from '@reduxjs/toolkit';
import qualitiesService from '../services/qualitiesService';

const qualitiesSlice = createSlice({
	name: 'qualities',
	initialState: {
		entities: [],
		isLoading: true,
		error: null,
		lastFetch: null,
	},
	reducers: {
		qualitiesRequested(state) {
			state.isLoading = true;
		},
		qualitiesRequestFailed(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
		qualitiesRecieved(state, action) {
			state.isLoading = false;
			state.entities = action.payload;
			state.lastFetch = Date.now();
		},
	},
});

const { actions, reducer: qualitiesReducer } = qualitiesSlice;
const { qualitiesRequested, qualitiesRequestFailed, qualitiesRecieved } =
	actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
	const { lastFetch } = getState().qualities;
	if (isOutdated(lastFetch)) {
		dispatch(qualitiesRequested());
		try {
			const { content } = await qualitiesService.get();
			dispatch(qualitiesRecieved(content));
		} catch (error) {
			dispatch(qualitiesRequestFailed(error.message));
		}
	}
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
	state.qualities.isLoading;
export const getQualitiesByIds = (ids) => (state) => {
	const qualitiesArray = [];
	const qualities = state.qualities.entities;
	for (const id of ids) {
		for (const quality of qualities) {
			if (id === quality._id) {
				qualitiesArray.push(quality);
				break;
			}
		}
	}
	return qualitiesArray;
};

function isOutdated(date) {
	if (Date.now() - date > 10 * 60 * 1000) return true;
	return false;
}

export default qualitiesReducer;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadQualitiesList } from '../../store/qualities';
import { loadProfessionsList } from '../../store/professions';
import {
	loadUsersList,
	getIsLoggedIn,
	getUsersLoadingStatus,
} from '../../store/users';

const AppLoader = ({ children }) => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(getIsLoggedIn());
	const isLoading = useSelector(getUsersLoadingStatus());

	useEffect(() => {
		dispatch(loadQualitiesList());
		dispatch(loadProfessionsList());
		if (isLoggedIn) {
			dispatch(loadUsersList());
		}
	}, [isLoggedIn]);

	if (isLoading) return 'loading';
	return children;
};

export default AppLoader;

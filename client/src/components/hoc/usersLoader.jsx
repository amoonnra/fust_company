import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsersList, getDataStatus } from '../../store/users';

const UsersLoader = ({ children }) => {
	const dataStatus = useSelector(getDataStatus());
	const dispatch = useDispatch();

	useEffect(() => {
		if (!dataStatus) dispatch(loadUsersList());
	}, []);
	if (!dataStatus) return 'Loading';
	return children;
};

export default UsersLoader;

import React, { useEffect } from 'react';
import { logOut } from '../store/users';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(logOut());
		navigate('/');
	}, []);
	return <h1>Loading...</h1>;
};

export default LogOut;

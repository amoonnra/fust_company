import React from 'react';
import { getIsLoggedIn } from '../../store/users';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ redirectTo, children }) => {
	const isLoggedIn = useSelector(getIsLoggedIn());
	let location = useLocation();
	return isLoggedIn ? (
		<Outlet />
	) : (
		<Navigate to={redirectTo} state={{ from: location }} />
	);
};

export default ProtectedRoute;

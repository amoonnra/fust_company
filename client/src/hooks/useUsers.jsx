import React, { useContext, useEffect, useState } from 'react';
import userService from '../services/userService';
import { useAuth } from './useAuth';
import { toast } from 'react-toastify';

const UserContext = React.createContext();

export const useUser = () => {
	return useContext(UserContext);
};

const UserProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	const { currentUser } = useAuth();

	useEffect(() => {
		getUsers();
	}, []);
	useEffect(() => {
		if (error !== null) {
			toast(error);
			setError(null);
		}
	}, [error]);
	useEffect(() => {
		if (!isLoading) {
			const newUsers = [...users];
			const indexUser = users.findIndex((u) => u._id === currentUser._id);
			console.log(indexUser);
			newUsers[indexUser] = currentUser;
			setUsers(newUsers);
		}
	}, [currentUser]);

	async function getUsers() {
		try {
			const { content } = await userService.get();
			setUsers(content);
			setIsLoading(false);
		} catch (error) {
			errorCatcher(error);
		}
	}

	function getUserById(userId) {
		return users.find((u) => u._id === userId);
	}

	function errorCatcher(error) {
		const { message } = error.response.data;
		setError(message);
		setIsLoading(false);
	}

	return (
		<UserContext.Provider value={{ users, getUserById }}>
			{!isLoading ? children : 'Loading...'}
		</UserContext.Provider>
	);
};

export default UserProvider;

import React, { useContext, useEffect, useState } from 'react';
import professionService from '../services/professionService';
import { toast } from 'react-toastify';

const ProfessionContext = React.createContext();

export const useProfession = () => {
	return useContext(ProfessionContext);
};

const ProfessionProvider = ({ children }) => {
	const [professions, setProfessions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	useEffect(() => {
		getProfessionsList();
	}, []);
	useEffect(() => {
		if (error !== null) {
			toast(error);
			setError(null);
		}
	}, [error]);

	function getProfession(id) {
		console.log(professions);
		return professions.find((p) => p._id === id);
	}

	async function getProfessionsList() {
		try {
			const { content } = await professionService.get();
			setProfessions(content);
			setIsLoading(false);
		} catch (error) {
			errorCatcher(error);
		}
	}
	function errorCatcher(error) {
		const { message } = error.response.data;
		setError(message);
	}

	return (
		<ProfessionContext.Provider
			value={{ isLoading, professions, getProfession }}
		>
			{!isLoading ? children : 'Loading...'}
		</ProfessionContext.Provider>
	);
};

export default ProfessionProvider;

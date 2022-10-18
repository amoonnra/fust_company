import React, { useContext, useEffect, useState } from 'react';
import qualitiesService from '../services/qualitiesService';
import { toast } from 'react-toastify';

const QualitiesContext = React.createContext();

export const useQualities = () => {
	return useContext(QualitiesContext);
};

const QualitiesProvider = ({ children }) => {
	const [qualities, setQualities] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	useEffect(() => {
		getQualitiesList();
	}, []);
	useEffect(() => {
		if (error !== null) {
			toast(error);
			setError(null);
		}
	}, [error]);

	function getQuality(id) {
		return qualities.find((q) => q._id === id);
	}

	async function getQualitiesList() {
		try {
			const { content } = await qualitiesService.get();
			setQualities(content);
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
		<QualitiesContext.Provider value={{ isLoading, qualities, getQuality }}>
			{!isLoading ? children : 'Loading...'}
		</QualitiesContext.Provider>
	);
};

export default QualitiesProvider;

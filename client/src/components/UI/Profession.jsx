import React from 'react';
import { useSelector } from 'react-redux';
import {
	getProfessionById,
	getProfessionsLoadingStatus,
} from '../../store/professions';

const Profession = ({ id }) => {
	const prof = useSelector(getProfessionById(id));
	const isLoading = useSelector(getProfessionsLoadingStatus());

	if (!isLoading) {
		return prof.name;
	} else return 'Loading...';
};

export default Profession;

import React, { useEffect } from 'react';
import Quality from './quality';
import {
	getQualitiesLoadingStatus,
	getQualitiesByIds,
	loadQualitiesList,
} from '../../../store/qualities';
import { useDispatch, useSelector } from 'react-redux';

const QualitiesList = ({ qualities }) => {
	const isLoading = useSelector(getQualitiesLoadingStatus());
	const qualitiesList = useSelector(getQualitiesByIds(qualities));
	const dispath = useDispatch();
	useEffect(() => {
		dispath(loadQualitiesList());
	}, []);

	if (isLoading) {
		return 'Loading...';
	}

	return qualitiesList.map((qualitie) => (
		<Quality key={qualitie._id} {...qualitie} />
	));
};

export default QualitiesList;

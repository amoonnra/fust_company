import React from 'react';
import Rating from './Rating';
import UserAva from './UserAva';
import { useSelector } from 'react-redux';
import { getProfessionById } from '../../store/professions';

const UserMainCard = ({ name, profession, imgKey, rate }) => {
	const professionName = useSelector(getProfessionById(profession)).name;
	return (
		<div className="d-flex flex-column align-items-center text-center position-relative">
			<UserAva imgKey={imgKey} width="180" />
			<div className="mt-3">
				<h4>{name}</h4>
				<p className="text-secondary mb-1">{professionName}</p>
				<Rating value={rate} />
			</div>
		</div>
	);
};

export default UserMainCard;

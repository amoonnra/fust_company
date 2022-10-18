import React, { useEffect, useState } from 'react';
import {
	getCurrentUserData,
	getDataStatus,
	getUsersList,
} from '../../store/users';
import { Link } from 'react-router-dom';
import UserAva from './UserAva';
import { useSelector } from 'react-redux';

const NavUser = () => {
	const [isOpen, setIsOpen] = useState(false);
	const currentUser = useSelector(getCurrentUserData());
	const dataLoaded = useSelector(getDataStatus());
	const users = useSelector(getUsersList());

	return (
		<div className="dropdown">
			<button
				className="btn text-white dropdown-toggle d-flex align-items-center"
				onClick={() => setIsOpen((p) => !p)}
			>
				<UserAva imgKey={currentUser?._id} height="40" classes="me-2" />
				{currentUser?.name}
			</button>
			<div className={'dropdown-menu w-100 mt-1' + (isOpen ? ' show' : '')}>
				<Link className="dropdown-item" to={'/users/' + currentUser?._id}>
					Profile
				</Link>
				<Link className="dropdown-item" to="/logout">
					Log out
				</Link>
			</div>
		</div>
	);
};

export default NavUser;

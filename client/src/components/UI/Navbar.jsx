import React from 'react';
import { NavLink } from 'react-router-dom';
import { getIsLoggedIn } from '../../store/users';
import NavUser from './navUser';
import { useSelector } from 'react-redux';

const Navbar = () => {
	const isLoggedIn = useSelector(getIsLoggedIn());
	return (
		<nav className="bg-dark text-white navbar px-5 py-3">
			<div className="container-fluid">
				<ul className="nav text-white">
					<li className="nav-item">
						<NavLink className="nav-link text-white" to="/">
							Главная
						</NavLink>
					</li>
					{isLoggedIn && (
						<li className="nav-item">
							<NavLink className="nav-link text-white" to="users">
								Пользователи
							</NavLink>
						</li>
					)}
				</ul>
				<div className="d-flex">
					{isLoggedIn ? (
						<NavUser />
					) : (
						<NavLink className="text-white" to="login/signin">
							Войти
						</NavLink>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

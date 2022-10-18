import React, { useEffect } from 'react';
import Users from './layouts/Users';
import Main from './layouts/Main';
import Login from './layouts/Login';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import LogOut from './layouts/LogOut';
import UserPage, { UserPageEdit } from './components/page/userPage';
import { ToastContainer } from 'react-toastify';
import UserLoader from './components/hoc/usersLoader';
import AppLoader from './components/hoc/appLoader';

export default function App() {
	return (
		<>
			<AppLoader>
				<Navbar />
				<div className="content p-5 container-fluid">
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="login/*" element={<Login />} />

						<Route element={<ProtectedRoute redirectTo="/login/signin" />}>
							<Route
								path="users"
								element={
									<UserLoader>
										<Users />
									</UserLoader>
								}
							/>
							<Route
								path="users/:id"
								element={
									<UserLoader>
										<UserPage />
									</UserLoader>
								}
							/>
							<Route
								path="users/:id/edit"
								element={
									<UserLoader>
										<UserPageEdit />
									</UserLoader>
								}
							/>
						</Route>
						<Route path="/logout" element={<LogOut />} />
					</Routes>
				</div>
			</AppLoader>
			<ToastContainer />
		</>
	);
}

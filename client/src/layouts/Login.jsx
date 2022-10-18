import React from 'react';
import LoginForm from '../components/UI/LoginForm';
import SignInForm from '../components/UI/SignInForm';
import { Route, Routes } from 'react-router-dom';

const Login = () => {
    return (
        <div className="m-auto" style={{ maxWidth: '500px' }}>
            <Routes>
                <Route
                    index
                    element={
                        <>
                            <h1 style={{ textAlign: 'center' }}>Регистрация</h1>
                            <LoginForm />
                        </>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <>
                            <h1 style={{ textAlign: 'center' }}>Авторизация</h1>
                            <SignInForm />
                        </>
                    }
                />
            </Routes>
        </div>
    );
};

export default Login;

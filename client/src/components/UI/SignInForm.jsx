import { useEffect, useState } from 'react';
import FormComponent, { TextField } from '../common/form/';
import CheckBoxField from '../common/form/CheckBoxField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, getRequestError } from '../../store/users';

const SignInForm = () => {
  const dispath = useDispatch();
  const loginError = useSelector(getRequestError());
  const navigate = useNavigate();
  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Введите электронную почту',
      },
    },
    password: {
      isRequired: {
        message: 'Введите пароль',
      },
    },
  };

  const handleSubmit = async (data) => {
    const isOk = await dispath(signIn(data));
    // console.log(isOk);
    const historyUrl = window.history.state?.usr?.from?.pathname;
    if (isOk) navigate(historyUrl || '/');
  };

  return (
    <div className="shadow mt-4 p-4 rounded">
      <FormComponent onSubmit={handleSubmit} validatorConfig={validatorConfig}>
        <TextField labelText="Электронная почта: " id="email" name="email" />
        <TextField
          labelText="Пароль: "
          type="password"
          id="password"
          name="password"
        />
        <CheckBoxField name="rememberme">Запомнить меня</CheckBoxField>
        {loginError && <p className="text-danger">{loginError}</p>}
        <button className="btn btn-primary w-100 mt-2">Войти</button>
        <p className="mt-3">
          Еще не зарегистрировались? <Link to="/login">Регистрация</Link>
        </p>
      </FormComponent>
    </div>
  );
};

export default SignInForm;

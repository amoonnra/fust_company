import { useEffect, useState } from 'react';
import FormComponent, { TextField, SelectField } from '../common/form/';
import RadioField from '../common/form/RadioField';
import MultiSelectField from '../common/form/MultiSelectField';
import CheckBoxField from '../common/form/CheckBoxField';
import { Link, useNavigate } from 'react-router-dom';
import { getQualities } from '../../store/qualities';
import { getProfessions } from '../../store/professions';
import { signUp } from '../../store/users';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = () => {
	const dispath = useDispatch();
	const [data, setData] = useState({
		sex: 'male',
		liscence: false,
	});
	// const [errors, setErrors] = useState({});
	const profession = useSelector(getProfessions());
	const qualities = useSelector(getQualities());
	const navigate = useNavigate();

	const validatorConfig = {
		email: {
			isRequired: {
				message: 'Электронная почта обязательна к заполнению',
			},
			isEmail: {
				message: 'Введите корректный адрес почты',
			},
		},
		name: {
			isRequired: {
				message: 'Имя обязательно к заполнению',
			},
			min: {
				value: 3,
				message: 'Имя должно содержать больше 3 символов',
			},
		},
		password: {
			isRequired: {
				message: 'Пароль обязателен к заполнению',
			},
			isCapital: {
				message: 'Пароль должен содержать хотя бы 1 заглавную букву',
			},
			isDigit: {
				message: 'Пароль должен содержать хотя бы 1 цифру',
			},
			min: {
				value: 6,
				message: 'Пароль должен содержать больше 6 символов',
			},
		},
		profession: {
			isRequired: {
				message: 'Обязательно выберите проффесcию',
			},
		},
		liscence: {
			isRequired: {
				message: 'Вы должны согласиться с лицензионным соглашением',
			},
		},
	};

	const handleSubmit = async (data) => {
		const newData = {
			...data,
			qualities: data.qualities.map((q) => q.value),
		};
		try {
			const isOk = await dispath(signUp(newData));
			const historyUrl = window.history.state?.usr?.from?.pathname;
			// if (isOk) navigate(historyUrl || '/');
			// else console.log('obj');
		} catch (error) {
			console.log('eeerrr');
		}
	};

	return (
		<div className="shadow mt-4 p-4 rounded">
			<FormComponent
				onSubmit={handleSubmit}
				validatorConfig={validatorConfig}
				defaultData={data}
			>
				<TextField labelText="Имя: " id="name" name="name" autoFocus />
				<TextField
					labelText="Электронная почта: "
					id="email"
					name="email"
				/>
				<TextField
					labelText="Пароль: "
					type="password"
					id="password"
					name="password"
				/>

				<SelectField
					name="profession"
					labelText="Выберите проффесию"
					defaultOption="Выберите..."
					options={profession}
				/>

				<RadioField
					name="sex"
					labelText="Выберите ваш пол"
					options={[
						{ name: 'Male', value: 'male' },
						{ name: 'Female', value: 'female' },
						{ name: 'Other', value: 'other' },
					]}
				/>

				<MultiSelectField
					options={qualities}
					name="qualities"
					labelText="Выберите свои качества"
				/>

				<CheckBoxField name="liscence">
					Подтвердить <a href="#">лицензионное соглашение</a>
				</CheckBoxField>
				<button className="btn btn-primary w-100 mt-4 ">
					Зарегистрироваться
				</button>
				<p className="mt-3">
					Уже есть аккаунт? <Link to="signin">Войти</Link>
				</p>
			</FormComponent>
		</div>
	);
};

export default LoginForm;

const genereteAuthError = (message) => {
	switch (message) {
		case 'EMAIL_EXISTS':
			return 'Пользователь с таким email уже существует';

		case 'INVALID_EMAIL':
		case 'EMAIL_NOT_FOUND':
		case 'INVALID_PASSWORD':
			return 'Email или пароль введен не корректно';

		default:
			return 'Слишком много попыток. Попробуйте позже';
	}
};

export default genereteAuthError;

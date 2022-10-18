export function validator(data, config) {
	const errors = {};

	function validate(validateMethod, data, config) {
		switch (validateMethod) {
			case 'isRequired':
				if (
					(typeof data == 'boolean' && data === false) ||
					(typeof data == 'string' && data.trim() === '') ||
					(typeof data == 'object' && Object.keys(data).length === 0)
				) {
					return config.message;
				}
				break;
			case 'isEmail':
				const emailRegEx = /^\S+@\S+\.\S+$/g;
				if (!emailRegEx.test(data)) {
					return config.message;
				}
				break;
			case 'min':
				if (data.length < config.value) {
					return config.message;
				}
				break;
			case 'isCapital':
				if (!/[A-Z]+/g.test(data)) {
					return config.message;
				}
				break;
			case 'isDigit':
				if (!/\d+/g.test(data)) {
					return config.message;
				}
				break;
			default:
				break;
		}
	}

	for (const fieldName in data)
		for (const validateMethod in config[fieldName]) {
			const error = validate(
				validateMethod,
				data[fieldName],
				config[fieldName][validateMethod]
			);
			if (error && !errors[fieldName]) {
				errors[fieldName] = error;
			}
		}

	return errors;
}

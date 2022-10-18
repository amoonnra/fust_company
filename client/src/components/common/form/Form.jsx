import React, { useCallback, useEffect, useState } from 'react';
import { validator } from '../../../utils/validator';

const FormComponent = ({
	children,
	validatorConfig,
	onSubmit,
	defaultData,
	autoClear,
	...rest
}) => {
	const [data, setData] = useState(defaultData || {});
	const [errors, setErrors] = useState({});
	const handleChange = useCallback((target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const isValid = validate(data);
		if (!isValid) return;
		try {
			await onSubmit(data);
		} catch (error) {
			setErrors((prevState) => ({ ...prevState, ...error }));
		}
		if (autoClear) setData({});
	};
	const handleKeyDown = useCallback((event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			const form = event.target.form;
			const indexField = Array.prototype.indexOf.call(form, event.target);
			form[indexField + 1].focus();
		}
	}, []);

	useEffect(() => {
		if (Object.keys(data).length > 0) {
			validate(data);
		}
	}, [data]);

	useEffect(() => {}, [errors]);

	const validate = useCallback(
		(data) => {
			const errors = validator(data, validatorConfig);
			setErrors(errors);
			return Object.keys(errors).length === 0;
		},
		[validatorConfig, setErrors]
	);

	const isValid = Object.keys(errors).length === 0;

	const clonedElements = React.Children.map(children, (child) => {
		if (!child) return;
		const childType = typeof child.type;
		let config = {};
		if (childType === 'object' || childType === 'function') {
			if (!child.props.name) {
				throw new Error('Name property is required', child);
			}
			config = {
				...child.props,
				onChange: handleChange,
				value: data[child.props.name] || '',
				error: errors[child.props.name],
				onKeyDown: handleKeyDown,
			};
		}
		if (childType === 'string') {
			if (child.type === 'button') {
				if (
					child.props.type === 'submit' ||
					child.props.type === undefined
				) {
					config = {
						disabled: !isValid,
						...child.props,
					};
				}
			}
		}
		return React.cloneElement(child, config);
	});

	return (
		<form onSubmit={handleSubmit} {...rest}>
			{clonedElements}
		</form>
	);
};

export default FormComponent;

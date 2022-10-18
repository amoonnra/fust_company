import React from 'react';

const CheckBoxField = ({ children, value, name, onChange, error }) => {
	const handleChange = () => {
		onChange({ name: name, value: !value });
	};

	return (
		<div className="form-check container mb-3 ms-2">
			<input
				name={name}
				className={'form-check-input' + (error ? ' is-invalid' : '')}
				type="checkbox"
				value=""
				checked={value}
				id={name}
				onChange={handleChange}
			/>
			<label className="form-check-label" htmlFor={name}>
				{children}
			</label>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default CheckBoxField;

import React, { useState } from 'react';

const TextAreaField = ({
	name,
	labelText,
	onChange,
	error,
	placeholder,
	value,
	rows,
	...rest
}) => {
	const handleChange = ({ target }) => {
		onChange({ name: [target.name], value: target.value });
	};

	return (
		<div className="mb-3">
			{labelText && (
				<label htmlFor={name} className="form-label w-100">
					{labelText}
				</label>
			)}
			<div className="input-group has-validation">
				<textarea
					className={'form-control' + (error ? ' is-invalid' : '')}
					id={name}
					name={name}
					onChange={handleChange}
					placeholder={placeholder}
					value={value}
					rows={rows}
					{...rest}
				/>
				{error && <div className="invalid-feedback">{error}</div>}
			</div>
		</div>
	);
};

TextAreaField.defaultProps = {
	type: 'text',
};

export default React.memo(TextAreaField);

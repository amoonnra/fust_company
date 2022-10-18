import React, { useEffect, useState } from 'react';

const SelectField = ({
	name,
	labelText,
	value,
	onChange,
	error,
	defaultOption,
	options,
	...rest
}) => {
	const handleChange = ({ target }) => {
		onChange({ name: [target.name], value: target.value });
	};
	// useEffect(() => console.log('render select only'));
	return (
		<div className="mb-3">
			{labelText && (
				<label htmlFor={name} className="form-label w-100">
					{labelText}
				</label>
			)}
			<select
				className="form-select"
				aria-label="Default select"
				name={name}
				value={value}
				id={name}
				onChange={handleChange}
				className={'form-select' + (error ? ' is-invalid' : '')}
				{...rest}
			>
				<option disabled value="">
					{defaultOption}
				</option>
				{options.map((opt) => (
					<option key={opt._id} value={opt._id}>
						{opt.name}
					</option>
				))}
			</select>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default React.memo(SelectField);

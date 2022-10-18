import React, { useState } from 'react';

const RadioField = ({ name, labelText, value, onChange, options }) => {
	const handleChange = ({ target }) => {
		onChange({ name: [target.name], value: target.value });
	};
	return (
		<div className="mb-3">
			<div>
				{labelText && (
					<label htmlFor={name} className="form-label w-100">
						{labelText}
					</label>
				)}
				{options.map((opt) => (
					<div
						key={opt.name + '_' + opt.value}
						className="form-check form-check-inline"
					>
						<input
							className="form-check-input"
							type="radio"
							id={opt.name + '_' + opt.value}
							name={name}
							value={opt.value}
							checked={opt.value === value}
							onChange={handleChange}
						/>
						<label
							className="form-check-label"
							htmlFor={opt.name + '_' + opt.value}
						>
							{opt.name}
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default RadioField;

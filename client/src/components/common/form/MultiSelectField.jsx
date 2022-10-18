import React from 'react';
import Select from 'react-select';

const MultiSelectField = ({
	name,
	options,
	onChange,
	labelText,
	defaultValues,
	error,
	...rest
}) => {
	const optionsArr =
		!Array.isArray(options) && typeof options === 'object'
			? Object.keys(options).map((optName) => ({
					label: options[optName].name,
					value: options[optName]._id,
			  }))
			: options.map((opt) => ({
					label: opt.name,
					value: opt._id,
			  }));

	const handleChange = (value) => {
		onChange({ name: name, value });
	};

	return (
		<div className="mb-3">
			<div className="has-validation">
				{labelText && (
					<label htmlFor={name} className="form-label w-100">
						{labelText}
					</label>
				)}
				<Select
					className={error ? ' is-invalid' : ''}
					closeMenuOnSelect={true}
					isMulti
					defaultValue={defaultValues}
					name={name}
					onChange={handleChange}
					options={optionsArr}
					error={error}
					{...rest}
				/>
				{error && <div className="invalid-feedback">{error}</div>}
			</div>
		</div>
	);
};

export default MultiSelectField;

import React, { useState } from 'react';

const TextField = ({
	type,
	id,
	name,
	labelText,
	onChange,
	error,
	placeholder,
	value,
	...rest
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const handleTogglePassword = () => {
		setShowPassword((prevState) => !prevState);
	};
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
				<input
					className={'form-control' + (error ? ' is-invalid' : '')}
					type={showPassword ? 'text' : type}
					id={id}
					name={name}
					onChange={handleChange}
					placeholder={placeholder}
					value={value}
					{...rest}
				/>
				{type === 'password' && (
					<button
						onClick={handleTogglePassword}
						type="button"
						className="btn btn-outline-secondary"
					>
						<i
							className={'bi bi-eye' + (showPassword ? '-slash' : '')}
						></i>
					</button>
				)}
				{error && <div className="invalid-feedback">{error}</div>}
			</div>
		</div>
	);
};

TextField.defaultProps = {
	type: 'text',
};

export default React.memo(TextField);

import React from 'react';
const Rating = ({ value }) => {
	return (
		<div className="text-muted">
			<i className="bi bi-caret-down-fill text-primary" role="button"></i>
			<i className="bi bi-caret-up text-secondary" role="button"></i>
			<span className="ms-2">{value}</span>
		</div>
	);
};

export default Rating;

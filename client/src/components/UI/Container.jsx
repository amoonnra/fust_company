import React from 'react';

const Container = ({ children }) => {
	return (
		<div className="container">
			<div className="row gutters-sm">{children}</div>
		</div>
	);
};

export default Container;

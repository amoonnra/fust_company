import React from 'react';

const LeftColumn = ({ children }) => {
	return (
		<div className="col-md-4 mb-3">
			{React.Children.map(children, (child) => child)}
		</div>
	);
};

export default LeftColumn;

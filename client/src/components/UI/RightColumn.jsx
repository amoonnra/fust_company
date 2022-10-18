import React from 'react';

const RightColumn = ({ children }) => {
	return (
		<div className="col-md-8">
			{React.Children.map(children, (child) => child)}
		</div>
	);
};

export default RightColumn;

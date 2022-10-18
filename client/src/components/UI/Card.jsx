import React from 'react';

const Card = ({ children, title, text, classes, isContent }) => {
	return (
		<div className="card mb-3">
			<div className={'card-body ' + (classes ? classes : '')}>
				{title &&
					(isContent ? (
						<h2 className="card-title mb-4">{title}</h2>
					) : (
						<h5 className="card-title">
							<span>{title}</span>
						</h5>
					))}
				{text && <p className="card-text">{text}</p>}
				{children}
			</div>
		</div>
	);
};

export default Card;

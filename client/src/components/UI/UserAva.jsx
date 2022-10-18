import React from 'react';

const UserAva = ({ imgKey, classes, ...rest }) => {
	return (
		<img
			src={`https://avatars.dicebear.com/api/avataaars/${imgKey}.svg`}
			className={'rounded-circle ' + (classes || '')}
			{...rest}
		/>
	);
};

export default UserAva;

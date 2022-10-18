import React from 'react';

export default function Quality({ color, name }) {
	return <span className={`badge m-1 p-2 bg-${color}`}>{name}</span>;
}

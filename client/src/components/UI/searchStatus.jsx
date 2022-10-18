import React from 'react';

export default function SearchStatus(props) {
	const regexTitle = `${props.qntyOfMen} человек${
		/(^|[2-9])[234]$/.test(props.qntyOfMen) ? 'a' : ''
	} ${
		/(^|[2-9])[1]$/.test(props.qntyOfMen) ? ' хочет' : ' хотят'
	} тусануться с тобой сегодня`;

	return (
		<h1
			className={
				'totalCompany badge mb-4 fw-bolder fs-3 text-bg-' +
				(props.qntyOfMen ? 'primary' : 'danger')
			}
		>
			{regexTitle}
		</h1>
	);
}

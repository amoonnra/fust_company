import React from 'react';

export default function Bookmark(props) {
	const bookmarkIconClassses = `bi bi-bookmark-${
		props.bookmark ? 'x' : 'star'
	}`;
	const bookmarkClassses = `btn btn-${
		props.bookmark ? 'secondary' : 'success'
	}`;
	return (
		<button
			className={bookmarkClassses}
			onClick={() => props.onToggleBookmark(props.id)}
		>
			<i className={bookmarkIconClassses}></i>
		</button>
	);
}

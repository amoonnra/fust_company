import React from 'react';

const TableHeader = ({ onSort, selectSort, columns }) => {
	const handleSort = (item) => {
		if (selectSort.path === item) {
			onSort({
				...selectSort,
				order: selectSort.order === 'asc' ? 'desc' : 'asc',
			});

			// selectSort.children += (
			// 	<i
			// 		className={
			// 			'bi bi-caret-' +
			// 			(selectSort.order === 'asc' ? 'down-fill' : 'up-fill')
			// 		}
			// 	></i>
			// );
		} else {
			onSort({ path: item, order: 'asc' });
		}
	};

	const renderSortCaret = (selectSort, curentPath) => {
		if (selectSort.path === curentPath) {
			if (selectSort.order === 'asc') {
				return <i className="bi bi-caret-up-fill"></i>;
			}
			return <i className="bi bi-caret-down-fill"></i>;
		}
	};

	return (
		columns && (
			<thead>
				<tr>
					{Object.keys(columns).map((column) => (
						<th
							key={column}
							width="20%"
							onClick={() =>
								columns[column].path && handleSort(columns[column].path)
							}
							{...{ role: columns[column].path && 'button' }}
						>
							{columns[column].name}
							{renderSortCaret(selectSort, columns[column].path)}
						</th>
					))}
				</tr>
			</thead>
		)
	);
};

export default TableHeader;

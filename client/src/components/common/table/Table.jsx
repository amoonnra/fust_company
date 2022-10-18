import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ columns, onSort, selectSort, data, children }) => {
	return (
		<table className="table">
			{children || (
				<>
					<TableHeader columns={columns} {...{ onSort, selectSort }} />
					<TableBody {...{ data, columns }} />
				</>
			)}
		</table>
	);
};

export default Table;

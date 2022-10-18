import React from 'react';
import _ from 'lodash';
import Bookmark from '../bookmark.jsx';
import { Link } from 'react-router-dom';

const TableBody = ({ data, columns }) => {
	const renderComponent = (item, column) => {
		const component = columns[column].component;
		if (component) {
			if (typeof component === 'function') {
				return component(item);
			}
			return component;
		}

		const itemContent = _.get(item, columns[column].path);
		if (columns[column].path === 'name') {
			return <Link to={item._id}>{itemContent}</Link>;
		}
		return itemContent;
	};

	return (
		<tbody>
			{data.map((item) => (
				<tr key={item._id}>
					{Object.keys(columns).map((column) => (
						<td key={column}>{renderComponent(item, column)}</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

export default TableBody;

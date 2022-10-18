import React, { useState } from 'react';
import Table, { TableBody, TableHeader } from '../common/table';
import Bookmark from '../common/bookmark';
import Qualities from './qualities';
import Profession from './Profession';

const UsersTable = ({
	users,
	onSort,
	selectSort,
	onToggleBookmark,
	bookmark,
	onDelete,
	...rest
}) => {
	const columns = {
		name: { path: 'name', name: 'Имя' },
		qualities: {
			name: 'Качество',
			component: (user) => <Qualities qualities={user.qualities} />,
		},
		profession: {
			name: 'Проффесия',
			component: (user) => <Profession id={user.profession} />,
		},
		completedMeetings: { path: 'completedMeetings', name: 'Встретился раз' },
		rate: { path: 'rate', name: 'Оценка' },
		bookmark: {
			name: 'Закладки',
			path: 'bookmark',
			component: (user) => (
				<Bookmark
					onToggleBookmark={() => onToggleBookmark(user._id)}
					bookmark={user.bookmark}
				/>
			),
		},
	};

	return (
		<Table
			columns={columns}
			onSort={onSort}
			selectSort={selectSort}
			data={users}
		>
			<TableHeader columns={columns} {...{ onSort, selectSort }} />
			<TableBody {...{ data: users, columns }} />
		</Table>
	);
};

export default UsersTable;

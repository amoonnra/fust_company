import React, { useState, useEffect } from 'react';
import api from '../../../api';
import SearchStatus from '../../UI/searchStatus';
import paginate from '../../../utils/paginate';
import _ from 'lodash';
import GroupList from '../../common/groupList';
import Pagination from '../../common/pagination';
import UsersTable from '../../UI/UsersTable';
import {
	getProfessionsLoadingStatus,
	getProfessions,
} from '../../../store/professions';
import {
	getUsersList,
	getDataStatus,
	getCurrentUserId,
} from '../../../store/users';
import { useSelector } from 'react-redux';

function UsersContent() {
	const [selectedProf, setSelectedProf] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [sortedBy, setSortedBy] = useState({ path: 'name', order: 'asc' });
	const users = useSelector(getUsersList());
	const currentUserId = useSelector(getCurrentUserId());
	const professions = useSelector(getProfessions());
	const professionsLoading = useSelector(getProfessionsLoadingStatus());
	const [searchData, setSearchData] = useState('');

	useEffect(() => setCurrentPage(1), [selectedProf, searchData]);

	const handleToggleBookmark = (id) => {
		const userIndex = users.findIndex((u) => u._id === id);
		const newUsersArr = [...users];
		newUsersArr[userIndex].bookmark = !newUsersArr[userIndex].bookmark;
	};

	const pageSize = 4;
	const filterUsers = () => {
		const filtredUsers = searchData
			? users.filter(
					(user) =>
						user.name.toLowerCase().indexOf(searchData.toLowerCase()) !== -1
			  )
			: selectedProf
			? users.filter((user) => {
					return (
						JSON.stringify(user.profession) === JSON.stringify(selectedProf._id)
					);
			  })
			: users;
		return filtredUsers.filter((u) => u._id !== currentUserId);
	};

	const sortedUsers = _.orderBy(
		filterUsers(),
		[sortedBy.path],
		[sortedBy.order]
	);
	const count = filterUsers().length;

	const handleSearch = ({ target }) => {
		setSelectedProf(undefined);
		setSearchData(target.value);
	};

	const usersCrop = paginate(sortedUsers, currentPage, pageSize);

	const clearProfessions = () => {
		setSelectedProf();
	};

	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex);
	};

	const handleProfessionSelect = (item) => {
		if (searchData !== '') setSearchData('');
		setSelectedProf(item);
	};
	const handleSort = (item) => {
		setSortedBy(item);
	};

	return (
		<div className="d-flex">
			{professions && !professionsLoading && (
				<div className="professions-container">
					<GroupList
						items={professions}
						selectedProf={selectedProf}
						onItemSelect={handleProfessionSelect}
					/>

					<button className="btn btn-secondary mt-3" onClick={clearProfessions}>
						Очистить
					</button>
				</div>
			)}
			<div className="users-container w-100">
				<SearchStatus qntyOfMen={count} />
				<input
					className="w-100"
					type="text"
					name="userSearch"
					id="userSearch"
					onChange={handleSearch}
					placeholder="Поиск..."
					value={searchData}
				/>
				{users.length > 0 && (
					<UsersTable
						users={usersCrop}
						onToggleBookmark={handleToggleBookmark}
						onSort={handleSort}
						selectSort={sortedBy}
					/>
				)}
				<div className="d-flex justify-content-center">
					<Pagination
						itemsCount={count}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	);
}

export default UsersContent;

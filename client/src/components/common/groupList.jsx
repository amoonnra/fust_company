import React from 'react';

const GroupList = ({
	items,
	valueProps,
	idProps,
	onItemSelect,
	selectedProf,
}) => {
	// const objItems = () => Object.keys(items).map((item) => {
	// 			const classes =
	// 				'list-group-item' +
	// 				(items[item] === selectedProf ? ' active' : '');
	// 			return (
	// 				<li
	// 					key={items[item][idProps]}
	// 					className={classes}
	// 					role="button"
	// 					onClick={() => onItemSelect(items[item])}
	// 				>
	// 					{items[item][valueProps]}
	// 				</li>
	// 			);
	// 		});
	// const arrItems = () => items.map((item) => {
	// 			const classes =
	// 				'list-group-item' +
	// 				(item === selectedProf ? ' active' : '');
	// 			return (
	// 				<li
	// 					key={item[idProps]}
	// 					className={classes}
	// 					role="button"
	// 					onClick={() => onItemSelect(item)}
	// 				>
	// 					{item[valueProps]}
	// 				</li>
	// 			);
	// 		});
	return (
		<ul className="list-group me-5">
			{items.map((item) => {
				const classes =
					'list-group-item' + (item === selectedProf ? ' active' : '');
				return (
					<li
						key={item[idProps]}
						className={classes}
						role="button"
						onClick={() => onItemSelect(item)}
					>
						{item[valueProps]}
					</li>
				);
			})}
		</ul>
	);
};

GroupList.defaultProps = {
	valueProps: 'name',
	idProps: '_id',
};

export default GroupList;

import React from 'react';
import useMockData from '../utils/mockData';

const Main = () => {
	const { error, status, progress, initialize } = useMockData();
	const handleClick = () => {
		console.log('run');
		initialize();
	};

	return (
		<>
			<h1>Main</h1>
			<h3 className="mt-3 mb-3">Инициализация БД в Firebase</h3>
			<ul className="mb-3">
				<li>{'Статус: ' + status}</li>
				<li>{'Прогресс: ' + progress + '%'}</li>
				{error && <li>{'Ощибочка...' + error}</li>}
			</ul>
			<button className="btn btn-primary" onClick={handleClick}>
				Инициализировать
			</button>
		</>
	);
};

export default Main;

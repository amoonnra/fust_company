import { useEffect, useState } from 'react';
import professions from '../mockData/professions';
import qualities from '../mockData/qualities';
import users from '../mockData/users';
import httpService from '../services/httpService';

const useMockData = () => {
	const statusConsts = {
		idle: 'Not started',
		pending: 'In progress',
		successed: 'Ready',
		error: 'Error Ocured',
	};
	const [error, setError] = useState(null);
	const [status, setStatus] = useState(statusConsts.idle);
	const [progress, setProgress] = useState(0);
	const [count, setCount] = useState(0);

	const sumCount = qualities.length + users.length + qualities.length;

	const incrCount = () => {
		setCount((prev) => prev + 1);
	};

	const updateProgress = () => {
		if (count !== 0 && status === statusConsts.idle) {
			setStatus(statusConsts.pending);
		}
		const newProgress = Math.floor((count / sumCount) * 100);
		if (progress < newProgress) {
			setProgress(() => newProgress);
		}
		if (newProgress === 100) {
			setStatus(statusConsts.successed);
		}
	};

	useEffect(() => updateProgress(), [count]);

	async function initialize() {
		try {
			for (const prof of professions) {
				await httpService.put('profession/' + prof._id, prof);
				incrCount();
			}
			for (const qual of qualities) {
				await httpService.put('quality/' + qual._id, qual);
				incrCount();
			}
			for (const user of users) {
				await httpService.put('user/' + user._id, user);
				incrCount();
			}
		} catch (error) {
			setError(error);
			setStatus(statusConsts.error);
			console.log(error.message);
		}
	}
	return { error, status, progress, initialize };
};

export default useMockData;

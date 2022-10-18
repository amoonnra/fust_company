import axios from 'axios';
import httpService from './httpService';
const config = require('../config.json');

const httpAuth = axios.create({
	baseURL: config.apiEndpoint + '/auth',
});

const authService = {
	register: async (payload) => {
		const { data } = await httpAuth.post('signUp', payload);
		return data;
	},
	signin: async (payload) => {
		const { data } = await httpAuth.post('signInWithPassword', payload);
		return data;
	},
	refresh: async (token) => {
		const { data } = await httpAuth.post('token', {
			grant_type: 'refresh_token',
			refresh_token: token,
		});
		return data;
	},
	update: async (payload, id) => {
		const { data } = await httpService.patch('user/' + id, payload);
		return data;
	},
};

export default authService;

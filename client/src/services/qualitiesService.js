import httpService from './httpService';

const qualitiesEndpoint = 'quality/';
const qualitiesService = {
	get: async () => {
		const { data } = await httpService.get(qualitiesEndpoint);
		return data;
	},
};

export default qualitiesService;

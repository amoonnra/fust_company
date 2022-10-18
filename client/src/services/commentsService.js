import httpService from './httpService';

const commentsEndpoint = '/comment/';
const commentsService = {
	create: async (payLoad) => {
		const { data } = await httpService.post(commentsEndpoint, payLoad);
		return data;
	},
	get: async (pageId) => {
		const { data } = await httpService.get(commentsEndpoint, {
			params: {
				orderBy: 'pageId',
				equalTo: `${pageId}`,
			},
		});
		return data;
	},
	remove: async (pageId) => {
		const { data } = await httpService.delete(commentsEndpoint + pageId);
		return data;
	},
};

export default commentsService;

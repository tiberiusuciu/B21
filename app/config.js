import moment from 'moment';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const appUrl = process.env.REACT_APP_URL || 'http://localhost:3000';

export default {
	apiUrl: apiUrl,
	appUrl: appUrl,
	staticUrl: process.env.STATIC_URL,
	defaults: {
		defaultState: {
			
		},
	},
};

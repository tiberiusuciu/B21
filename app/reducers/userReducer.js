import {
	NEW_USER,
	UPDATE_USERS,
	UPDATE_USER,
} from '../actions';

const user = (state = {
	username: 'undefined',
	inventory: {},
	stats: {},
	equipment: {},
	posX: 0,
	poxY: 0,
	health: 0,
}, action) => {
	switch (action.type) {
		case NEW_USER:
		case UPDATE_USER:
			return action.user;
		default:
			return state;
	}
};

const users = (state = [], action) => {
	console.log('action', action);
	switch (action.type) {
		case UPDATE_USERS:
			return state = action.users;
		default:
			return state;
	}
};

export default ({
	user,
	users,
});

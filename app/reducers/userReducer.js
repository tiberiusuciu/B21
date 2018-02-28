import {
	NEW_USER,
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
			return action.user;
		default:
			return state;
	}
};

export default ({
	user,
});

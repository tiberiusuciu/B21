import {
	NEW_USER,
	UPDATE_USERS,
	UPDATE_USER,
	ASSIGN_ID,
} from '../actions';

const user = (state = {
	id: '',
	username: '',
	money: 0,
	currentTurn: {
		cards: [],
		currentValue: 0,
		currentBet: 0,
		hasPlayed: false,
		hasBust: false,
		hasDoubled: false,
		hasBlackJack: false,
	},
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
	switch (action.type) {
		case UPDATE_USERS:
			return state = action.users;
		default:
			return state;
	}
};

const userId = (state = 0, action) => {
	switch (action.type) {
		case ASSIGN_ID:
			return action.id;
		default:
			return state;
	}
};

export default ({
	user,
	users,
	userId,
});

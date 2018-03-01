import {
	USER_MESSAGE_CHANGE,
	UPDATE_MESSAGE_LOGS,
} from '../actions';

const message = (state = '', action) => {
	switch (action.type) {
		case USER_MESSAGE_CHANGE:
			return action.message;
		default:
			return state;
	}
};

const messages = (state = [], action) => {
	switch (action.type) {
		case UPDATE_MESSAGE_LOGS:
			return action.messages;
		default:
			return state;
	}
};

export default ({
	message,
	messages,
});

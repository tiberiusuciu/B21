import {
	SET_USER_CURRENT_INPUT,
	SUBMIT_USER_INPUT,
	NEW_LOG_ENTRY,
	INVALID_COMMAND,
	NEW_USER,
} from '../actions';

const userCurrentInput = (state = '', action) => {
	switch (action.type) {
		case SET_USER_CURRENT_INPUT:
			return action.userCurrentInput;
		case SUBMIT_USER_INPUT:
			return '';
		default:
			return state;
	}
};

// This might not work, see logs reducer
const userInputHistory = (state = [], action) => {
	switch (action.type) {
		case SUBMIT_USER_INPUT:
			state.push(action.userCurrentInput);
			return state;
		default:
			return state;
	}
};

const logs = (state = [], action) => {
	switch (action.type) {
		case NEW_LOG_ENTRY:
			return [
				...state,
				{
					source: action.source,
					content: action.content,
					coloration: action.coloration,
				},
			];
		case INVALID_COMMAND:
			return [
				...state,
				{
					source: action.parsedCommand.source,
					content: action.parsedCommand.message,
					coloration: '#A00',
				},
			];
		default:
			return state;
	}
};

export default ({
	userCurrentInput,
	userInputHistory,
	logs,
});

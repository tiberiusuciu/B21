import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { merge } from 'lodash';

// import { FORM_CHANGE, FORM_RESET } from '../actions';

// import config from '../config.js';

// Reducers
import terminalBoxReducer from './terminalBoxReducer.js';
import userReducer from './userReducer.js';

function entities(state = { usage:0 }, action) {
	if (action.response && action.response.entities) {
		return merge({}, state, action.response.entities);
	}

	return state;
}

// const forms = (state = config.defaultForms, action) => {
// 	switch (action.type) {
// 		case FORM_CHANGE:
// 			return { ...state, [action.what]:{ ...state[action.what], [action.key]:action.value } };
// 		case FORM_RESET:
// 			return { ...state, [action.what]:{ ...config.defaultForms[action.what] } };
// 		default:
// 			return state;
// 	}
// };

export default combineReducers({
	routing,
	entities,
	...terminalBoxReducer,
	...userReducer,
});

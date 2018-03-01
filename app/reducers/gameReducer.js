import {
  NEW_USER,
} from '../actions';

const currentPhase = (state = '', action) => {
	switch (action.type) {
		case NEW_USER:
			return action.currentPhase;
		default:
			return state;
	}
};

export default ({
	currentPhase,
});

import {
  GAME_PHASE_CHANGE,
} from '../actions';

const currentPhase = (state = '', action) => {
	switch (action.type) {
		case GAME_PHASE_CHANGE:
			return action.currentPhase;
		default:
			return state;
	}
};

export default ({
	currentPhase,
});

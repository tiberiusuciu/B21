import {
  GAME_PHASE_CHANGE,
  UPDATE_CURRENT_USER_ID,
} from '../actions';

const currentPhase = (state = '', action) => {
	switch (action.type) {
		case GAME_PHASE_CHANGE:
			return action.currentPhase;
		default:
			return state;
	}
};

const currentUserId = (state = -1, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER_ID:
      return action.currentUserId;
    default:
      return state;
  }
};

const currentPlayer = (state = -1, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER_ID:
      return action.currentPlayer;
    default:
      return state;
  }
};

export default ({
	currentPhase,
  currentUserId,
  currentPlayer,
});

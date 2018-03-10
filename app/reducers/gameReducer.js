import {
  GAME_PHASE_CHANGE,
  UPDATE_CURRENT_USER_ID,
  UPDATE_DEALER,
  GAME_TICK,
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

const secondsPassed = (state = 0, action) => {
  switch (action.type) {
    case GAME_TICK:
      return action.seconds;
    default:
      return state;
  }
};

const dealer = (state = {
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
    case UPDATE_DEALER:
      return action.dealer;
    default:
      return state;
  }
}

export default ({
	currentPhase,
  currentUserId,
  currentPlayer,
  dealer,
  secondsPassed,
});

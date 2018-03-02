import MainPage from '../components/MainPage';
import { connect } from 'react-redux';
import Parser from '../modules/parser';
// import Oracle from '../modules/oracle';

import {
	setUserCurrentInput, submitCurrentInput, newLogEntry,
	sendCommand, invalidCommand, handleUserHit, handleUserSplit,
	handleUserDouble, handleUserHold, handleUserMessageChange,
	handleUserMessageSubmit, handleUserBet,
} from '../actions';

const _parser = (username, userCurrentInput) => {
	return Parser.validate(username, userCurrentInput);
	// Oracle.sendCommand(username, parsedCommand, dispatch);
};

const mapStateToProps = (state, ownProps) => {
	console.log('big state', state);
	return {
		userCurrentInput: state.userCurrentInput,
		userInputHistory: state.userInputHistory,
		logs: state.logs,
		users: state.users,
		message: state.message,
		messages: state.messages,
		currentPhase: state.currentPhase,
		userId: state.userId,
		currentUserId: state.currentUserId,
		currentPlayer: state.currentPlayer,
		dealer: state.dealer,
		// referredId: ownProps.location.query.referredId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onUserCurrentInput: (userCurrentInput) => {
			dispatch(setUserCurrentInput(userCurrentInput));
		},
		onSubmitCurrentInput: (username, userCurrentInput) => {
			// Temporarily disabled empty inputs until I figure out what purpose they could serve
			if (userCurrentInput !== "") {
				dispatch(submitCurrentInput(username, userCurrentInput));
				dispatch(newLogEntry(username, userCurrentInput, "#666"));
				// PARSER
				let parsedCommand = _parser(username, userCurrentInput);
				if(parsedCommand.validCommand) {
					if (parsedCommand.broadcast) {
						dispatch(sendCommand(parsedCommand));
					}
					else {
						// When the command does not require to notify the api
					}
				}
				else {
					dispatch(invalidCommand(parsedCommand));
				}
			}
		},
		onHandleAction: (type) => {
			switch (type) {
				case "hit":
					dispatch(handleUserHit());
					break;
				case "split":
					dispatch(handleUserSplit());
					break;
				case "double":
					dispatch(handleUserDouble());
					break;
				case "hold":
					dispatch(handleUserHold());
					break;
				default:

			}
		},
		handleChange: (message) => {
			dispatch(handleUserMessageChange(message));
		},
		handleSubmit: (message) => {
			dispatch(handleUserMessageSubmit(message));
		},
		handleBetClick: (value) => {
			dispatch(handleUserBet(value));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MainPage);

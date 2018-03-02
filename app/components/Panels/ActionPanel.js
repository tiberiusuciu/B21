import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class ActionPanel extends Component {

	findUser(id) {
		var found = false;
		var user = this.props.users.map((user) => {
			if(user.id == id) {
				found = true;
				return user;
			}
		})[0];
		if (found) {
			return user;
		}
		else {
			return {
				currentTurn: {
					currentBet: 0,
				},
			};
		}
	}

	handleClick(type, e) {
		if (!this.findUser(this.props.userId).currentTurn.hasBust) {
			this.props.handleAction(type);
		}
	}

	render() {
		return (
			<div className={styles.ActionPanel}>
        <div className={styles.PlayerActionButton} onClick={(e) => {this.handleClick("hit", e);}}>Hit</div>
        <div className={styles.PlayerActionButton} onClick={(e) => {this.handleClick("split", e);}}>Split</div>
        <div className={styles.PlayerActionButton} onClick={(e) => {this.handleClick("double", e);}}>Double</div>
				<div className={styles.PlayerActionButton} onClick={(e) => {this.handleClick("hold", e);}}>Hold</div>
			</div>
		)
	}
};

export default ActionPanel;

import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class ActionPanel extends Component {

	findUser(id) {
		console.log('users', this.props.users);
		var found = false;
		var user;
		for (var i = 0; i < this.props.users.length; i++) {
			if (this.props.users[i].id == id) {
				found = true;
				user = this.props.users[i];
				break;
			}
		}
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
		var user = this.findUser(this.props.userId);
		console.log(user);
		if (
			type == "split" &&
			user.currentTurn.cards.length == 2 &&
			user.currentTurn.hasSplit == false &&
			user.currentTurn.cards[0].charAt(0) == user.currentTurn.cards[1].charAt(0) &&
			user.currentTurn.currentBet + user.currentTurn.currentBet <= user.money) {

			this.props.handleAction(type);

		}
		if (!this.findUser(this.props.userId).currentTurn.hasBust && type != "hold") {
			if (type == "double") {
				if (user.money >= user.currentTurn.currentBet && type == "double" && !user.currentTurn.hasHit) {
					this.props.handleAction(type);
				}
			}
			else if (type == "hit") {
				this.props.handleAction(type);
			}
		}
		else if (type == "hold") {
			this.props.handleAction(type);
		}
	}

	render() {
		if (this.findUser(this.props.userId).currentTurn.hasBust) {
			this.props.handleAction("hold");
		}

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

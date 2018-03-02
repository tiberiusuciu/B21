import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class BetPanel extends Component {

	findUser(id) {
		var user = {
			currentTurn: {
				currentBet: 0,
			},
		};
		for (var i = 0; i < this.props.users.length; i++) {
			if (this.props.users[i].id == id) {
				user = this.props.users[i];
			}
		}
		console.log('user', user);
		return user;
	}

	handleBetClick (value) {
		if (value <= this.findUser(this.props.userId).money) {
			this.props.handleBetClick(value);
		}
	}

	render() {
		return (
			<div className={styles.BetPanel}>
        <div className={styles.BetAnnouncement}>Current Bet: {this.findUser(this.props.userId).currentTurn.currentBet} </div>
        <div className={styles.BetOptions}>
          <div className={styles.PlayerBetButton} onClick={() => {this.handleBetClick(5)}}>5</div>
          <div className={styles.PlayerBetButton} onClick={() => {this.handleBetClick(10)}}>10</div>
          <div className={styles.PlayerBetButton} onClick={() => {this.handleBetClick(25)}}>25</div>
          <div className={styles.PlayerBetButton} onClick={() => {this.handleBetClick(100)}}>100</div>
        </div>
			</div>
		)
	}
};

// <ActionPanel />
export default BetPanel;

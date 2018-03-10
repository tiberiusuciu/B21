import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class BetPanel extends Component {

	findUser(id) {
		var user = {
			currentTurn: {
				currentBet: 0,
			},
			money: 100,
		};
		for (var i = 0; i < this.props.users.length; i++) {
			if (this.props.users[i].id == id) {
				user = this.props.users[i];
			}
		}
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
				<div className={styles.BetMoney}>Available Money: {this.findUser(this.props.userId).money} </div>
        <div className={styles.BetAnnouncement}>Current Bet: {this.findUser(this.props.userId).currentTurn.currentBet} </div>
        <div className={styles.BetOptions}>
          <div className={styles.PlayerBetButton} onClick={() => {this.handleBetClick(5)}}>5</div>
          <div className={styles.PlayerBetButton} onClick={() => {this.handleBetClick(10)}}>10</div>
          <div className={styles.PlayerBetButton} onClick={() => {this.handleBetClick(50)}}>50</div>
          <div className={styles.PlayerBetButton} onClick={() => {this.handleBetClick(100)}}>100</div>
        </div>
			</div>
		)
	}
};

// <ActionPanel />
export default BetPanel;

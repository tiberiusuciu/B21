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

	handleBetClick (value, e) {
		e.preventDefault();
		if (e.type == "contextmenu") {
			if (value <= this.findUser(this.props.userId).currentTurn.currentBet) {
				this.props.handleBetClick(value * -1);
			}
		}
		else if (e.type == "click") {
			if (value <= this.findUser(this.props.userId).money) {
				this.props.handleBetClick(value);
			}
		}
	}

	render() {
		return (
			<div className={styles.BetPanel}>
				<div className={styles.BetMoney}>Available Money: {this.findUser(this.props.userId).money} </div>
        <div className={styles.BetAnnouncement}>Current Bet: {this.findUser(this.props.userId).currentTurn.currentBet} </div>
        <div className={styles.BetOptions}>
          <div className={styles.PlayerBetButton + " " + styles.noselect} onClick={(e) => {this.handleBetClick(5, e)}} onContextMenu={(e) => {this.handleBetClick(5, e)}}>5</div>
          <div className={styles.PlayerBetButton + " " + styles.noselect} onClick={(e) => {this.handleBetClick(10, e)}} onContextMenu={(e) => {this.handleBetClick(10, e)}}>10</div>
          <div className={styles.PlayerBetButton + " " + styles.noselect} onClick={(e) => {this.handleBetClick(50, e)}} onContextMenu={(e) => {this.handleBetClick(50, e)}}>50</div>
          <div className={styles.PlayerBetButton + " " + styles.noselect} onClick={(e) => {this.handleBetClick(100, e)}} onContextMenu={(e) => {this.handleBetClick(100, e)}}>100</div>
        </div>
			</div>
		)
	}
};

// <ActionPanel />
export default BetPanel;

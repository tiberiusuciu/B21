import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class BetPanel extends Component {

	handleBetClick (value) {
		if (value <= this.props.user.money) {
			this.props.handleBetClick(value);
		}
	}

	render() {
		return (
			<div className={styles.BetPanel}>
        <div className={styles.BetAnnouncement}>Current Bet: {this.props.user.currentTurn.currentBet} </div>
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

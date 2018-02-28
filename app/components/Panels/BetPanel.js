import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class BetPanel extends Component {
	render() {
		return (
			<div className={styles.BetPanel}>
        <div className={styles.BetAnnouncement}>Current Bet: 15</div>
        <div  className={styles.BetOptions}>
          <div className={styles.PlayerBetButton}>5</div>
          <div className={styles.PlayerBetButton}>10</div>
          <div className={styles.PlayerBetButton}>25</div>
          <div className={styles.PlayerBetButton}>100</div>
        </div>
			</div>
		)
	}
};

// <ActionPanel />
export default BetPanel;

import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class PlayerTab extends Component {
	render() {
		return (
			<div className={styles.PlayerTab}>
        <div className={styles.PlayerTabTotalCount}>21</div>
        <div className={styles.PlayerTabPlayerName}>Chris</div>
        <div className={styles.PlayerTabBet}>15</div>
			</div>
		)
	}
};

//  + " " + styles.PlayerTabInactive
export default PlayerTab;

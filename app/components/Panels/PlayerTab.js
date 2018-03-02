import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class PlayerTab extends Component {
	render() {
		return (
			<div>
				{
					this.props.isDealer ? (
						<div className={styles.PlayerTab}>
							<div className={styles.PlayerTabTotalCount}>{this.props.dealer.currentTurn.currentValue}</div>
							<div className={styles.PlayerTabPlayerName}>{this.props.dealer.username}</div>
						</div>
					) : (
						<div className={styles.PlayerTab}>
							<div className={styles.PlayerTabTotalCount}>{this.props.user.currentTurn.currentValue}</div>
							<div className={styles.PlayerTabPlayerName}>{this.props.user.username}</div>
							<div className={styles.PlayerTabBet}>{this.props.user.currentTurn.currentBet}</div>
						</div>
					)
				}
			</div>
		)
	}
};

//  + " " + styles.PlayerTabInactive
export default PlayerTab;

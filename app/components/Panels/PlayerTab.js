import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class PlayerTab extends Component {

	partialValue() {
		if (this.props.dealer.currentTurn.cards.length > 0) {
			if (
				this.props.dealer.currentTurn.cards[0].charAt(0) == 'J' ||
				this.props.dealer.currentTurn.cards[0].charAt(0) == 'Q' ||
				this.props.dealer.currentTurn.cards[0].charAt(0) == 'K' ||
				this.props.dealer.currentTurn.cards[0].charAt(0) == '1') {

					return 10;
				}
				else if (this.props.dealer.currentTurn.cards[0].charAt(0) != 'A') {
					return parseInt(this.props.dealer.currentTurn.cards[0].charAt(0));
				}
				else {
					return 11;
				}
		}
		else {
			return 0;
		}
	}

	render() {
		return (
			<div>
				{
					this.props.isDealer ? (
						<div className={styles.PlayerTab}>
							<div className={styles.PlayerTabTotalCount}>{this.partialValue()}</div>
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

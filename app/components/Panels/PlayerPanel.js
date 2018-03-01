import React, { Component } from 'react';

import ActionPanel from './ActionPanel';
import CardPanel from './CardPanel';
import BetPanel from './BetPanel';

import styles from '../../styles/MainPage.css';

class PlayerPanel extends Component {

	displayExtraPanels(currentPhase) {
		switch (currentPhase) {
			case "BETTING":
				return (<BetPanel />);
			case "DEALING":
				return (<ActionPanel user={this.props.user} handleAction={this.props.handleAction} />);
			default:
				return null;
		}
	}

	render() {
		console.log('this.props', this.props);
		return (
			<div className={styles.PlayerPanel}>
				<CardPanel cards={this.props.user.currentTurn.cards} />
				{
					this.displayExtraPanels(this.props.currentPhase)
				}
			</div>
		)
	}
};


// <BetPanel />
// <ActionPanel />
//  + " " + styles.Inactive
export default PlayerPanel;

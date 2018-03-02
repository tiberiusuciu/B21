import React, { Component } from 'react';

import ActionPanel from './ActionPanel';
import CardPanel from './CardPanel';
import BetPanel from './BetPanel';

import styles from '../../styles/MainPage.css';

class PlayerPanel extends Component {

	displayExtraPanels(currentPhase) {
		switch (currentPhase) {
			case "BETTING":
				return (<BetPanel
					userId={this.props.userId}
					users={this.props.users}
					handleBetClick={this.props.handleBetClick} />);
			case "DEALING":
			default:
				return null;
		}
	}
//cards={this.props.users[this.props.currentPlayer].currentTurn.cards}
	render() {
		console.log('tables panel state', this);
		return (
			<div className={styles.PlayerPanel + (this.props.userId != this.props.currentUserId ? " " + styles.Inactive : "")}>
				<CardPanel
					userId={this.props.userId}
					users={this.props.users}
					currentUserId={this.props.currentUserId}
					currentPlayer={this.props.currentPlayer}  />
				{
					this.displayExtraPanels(this.props.currentPhase)
				}
			</div>
		)
	}
};


/*
return (<ActionPanel
	userId={this.props.userId}
	users={this.props.users}
	currentUserId={this.props.currentUserId}
	currentPlayer={this.props.currentPlayer}
	handleAction={this.props.handleAction} />);
	*/

// <BetPanel />
// <ActionPanel />
//  + " " + styles.Inactive
export default PlayerPanel;

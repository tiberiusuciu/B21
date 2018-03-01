import React, { Component } from 'react';

import ActionPanel from './ActionPanel';
import CardPanel from './CardPanel';
import BetPanel from './BetPanel';

import styles from '../../styles/MainPage.css';

class PlayerPanel extends Component {
	render() {
		return (
			<div className={styles.PlayerPanel}>
				<CardPanel cards={this.props.user.cards} />
				<ActionPanel handleAction={this.props.handleAction} />
			</div>
		)
	}
};


// <BetPanel />
// <ActionPanel />
//  + " " + styles.Inactive
export default PlayerPanel;

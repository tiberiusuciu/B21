import React, { Component } from 'react';

import ActionPanel from './ActionPanel';
import CardPanel from './CardPanel';

import styles from '../../styles/MainPage.css';

class PlayerPanel extends Component {
	render() {
		return (
			<div className={styles.PlayerPanel}>
				<CardPanel />
        <ActionPanel />
			</div>
		)
	}
};

export default PlayerPanel;

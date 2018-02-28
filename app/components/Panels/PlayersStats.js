import React, { Component } from 'react';

import PlayerTab from './PlayerTab';

import styles from '../../styles/MainPage.css';

class PlayersStats extends Component {
	render() {
		return (
			<div className={styles.PanelDimensions + " " + styles.PlayersStats}>
				<PlayerTab />
				<PlayerTab />
			</div>
		)
	}
};

export default PlayersStats;

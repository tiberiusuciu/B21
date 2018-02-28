import React, { Component } from 'react';

import ActionPanel from './ActionPanel';

import styles from '../../styles/MainPage.css';

class PlayerPanel extends Component {
	render() {
		return (
			<div className={styles.PlayerPanel}>
        <p>PlayerPanel</p>
        <ActionPanel />
			</div>
		)
	}
};

export default PlayerPanel;

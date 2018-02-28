import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class ActionPanel extends Component {
	render() {
		return (
			<div className={styles.ActionPanel}>
        <div className={styles.PlayerActionButton}>Hit</div>
        <div className={styles.PlayerActionButton}>Split</div>
        <div className={styles.PlayerActionButton}>Double</div>
        <div className={styles.PlayerActionButton}>Hold</div>
			</div>
		)
	}
};

export default ActionPanel;

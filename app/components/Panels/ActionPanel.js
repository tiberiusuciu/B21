import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class ActionPanel extends Component {

	handleClick(type, e) {
		console.log('e', e);
		console.log('type', type);
		this.props.handleAction(type);
	}

	render() {
		return (
			<div className={styles.ActionPanel}>
        <div className={styles.PlayerActionButton} onClick={(e) => {this.handleClick("hit", e);}}>Hit</div>
        <div className={styles.PlayerActionButton} onClick={(e) => {this.handleClick("split", e);}}>Split</div>
        <div className={styles.PlayerActionButton} onClick={(e) => {this.handleClick("double", e);}}>Double</div>
				<div className={styles.PlayerActionButton} onClick={(e) => {this.handleClick("hold", e);}}>Hold</div>
			</div>
		)
	}
};

export default ActionPanel;

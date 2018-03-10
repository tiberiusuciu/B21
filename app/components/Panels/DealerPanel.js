import React, { Component } from 'react';

import CardPanel from './CardPanel';

import styles from '../../styles/MainPage.css';

class DealerPanel extends Component {
	render() {
		return (
			<div className={styles.DealerPanel}>
        <CardPanel
					dealer={this.props.dealer}
					currentPhase={this.props.currentPhase}
					isDealer />
				{this.props.currentPhase == "BETTING" ? (<div className={styles.TimeAnnouncement}>Game starts in {30 - this.props.secondsPassed} seconds!</div>) : null}

			</div>
		)
	}
};

export default DealerPanel;

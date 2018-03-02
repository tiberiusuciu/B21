import React, { Component } from 'react';

import DealerPanel from './DealerPanel';
import PlayerPanel from './PlayerPanel';

import styles from '../../styles/MainPage.css';

class TablesPanel extends Component {
	render() {
		return (
			<div className={styles.PanelDimensions + " " + styles.TablesPanel}>
        <div className={styles.SplitTableDimensions}>
          <DealerPanel />
          <PlayerPanel
						handleAction={this.props.handleAction}
						handleBetClick={this.props.handleBetClick}
						user={this.props.user}
						users={this.props.users}
						userId={this.props.userId}
						currentUserId={this.props.currentUserId}
						currentPlayer={this.props.currentPlayer}
						currentPhase={this.props.currentPhase}/>
        </div>
			</div>
		)
	}
};

export default TablesPanel;

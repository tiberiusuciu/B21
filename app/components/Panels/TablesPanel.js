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
          <PlayerPanel />
        </div>
			</div>
		)
	}
};

export default TablesPanel;

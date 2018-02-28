import React, { Component } from 'react';

import CardDisplay from './CardDisplay';
import MenuTools from './MenuTools';

import styles from '../../styles/Menu/MenuBox.css';

class MenuBox extends Component {
	render() {
		return (
			<div className={styles.menubox}>
					<CardDisplay />
          <MenuTools />
			</div>
		)
	}
};

export default MenuBox;

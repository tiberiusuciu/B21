import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class CardPanel extends Component {
	render() {
		return (
			<div className={styles.CardPanel}>
        <img src="/images/2C.png" className={styles.CardSize}/>
        <img src="/images/AC.png" className={styles.CardSize}/>
        <img src="/images/8D.png" className={styles.CardSize}/>
			</div>
		)
	}
};

export default CardPanel;

import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

let id = 0;
class CardPanel extends Component {
	render() {
		return (
			<div className={styles.CardPanel}>
				{
					this.props.cards ?
						this.props.cards.map ((card) => {
							return (<img key={++id} src={"/images/" + card} className={styles.CardSize}/>);
						})
					 : null
				}
			</div>
		)
	}
};

export default CardPanel;

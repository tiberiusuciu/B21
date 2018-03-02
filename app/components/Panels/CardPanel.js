import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

let id = 0;
class CardPanel extends Component {

	findUser(id) {
		var user = {
			currentTurn: {
				cards: [],
			},
		};
		for (var i = 0; i < this.props.users.length; i++) {
			if (this.props.users[i].id == id) {
				user = this.props.users[i];
			}
		}
		console.log('user', user);
		return user;
	}

	generateCardImages() {
		if (this.props.currentPlayer != -1 && this.props.currentPlayer != undefined) {
			return this.findUser(this.props.userId).currentTurn.cards.map ((card) => {
				return (<img key={++id} src={"/images/" + card} className={styles.CardSize}/>);
			})
		}
		else {
			return null;
		}
	}

	render() {
		return (
			<div className={styles.CardPanel}>
				{
					this.generateCardImages()
				}
			</div>
		)
	}
};

export default CardPanel;

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
		return user;
	}

	generateCardImages() {
		if (!this.props.isDealer) {
			console.log("Is dealer?", this.props.isDealer);
			if (this.props.currentPlayer != -1 && this.props.currentPlayer != undefined) {
				return this.findUser(this.props.userId).currentTurn.cards.map ((card) => {
					return (<img key={++id} src={"/images/" + card} className={styles.CardSize}/>);
				})
			}
			else {
				return null;
			}
		}
		else {
			console.log("dealer is dealing?", this.props.isDealer);
			var isSecondCard = false;
			return this.props.dealer.currentTurn.cards.map ((card) => {
				if (this.props.currentPhase == "DEALERTURN") {
					return (<img key={++id} src={"/images/" + card} className={styles.CardSize}/>);
				}
				else {
					if (isSecondCard) {
						return (<img key={++id} src={"/images/grayback.png"} className={styles.CardSize}/>);
					}
					else {
						isSecondCard = true;
						return (<img key={++id} src={"/images/" + card} className={styles.CardSize}/>);
					}
				}
			})
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

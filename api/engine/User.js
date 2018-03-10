var User = function(username, id) {
	this.id = id;
	this.username = username;
	this.money = 100;
	this.currentTurn = {
		cards: [],
		currentValue: 0,
		currentBet: 0,
		hasPlayed: false,
		hasHit: false,
		hasBust: false,
		hasDoubled: false,
		hasBlackJack: false,
	}
}

User.prototype.dealCards = function(newCards) {
	this.currentTurn.cards.push(...newCards);
	this.currentTurn.currentValue = this.evaluateCards();
	if (this.currentTurn.currentValue > 21) {
		this.currentTurn.hasBust = true;
	}
	else if (this.currentTurn.currentValue == 21 && this.currentTurn.cards.length == 2) {
		this.currentTurn.hasBlackJack = true;
	}
};

User.prototype.evaluateCards = function(newCards) {
	var tmp = 0;
	this.currentTurn.cards.forEach( function (card) {
		if (card.charAt(0) == 'J' || card.charAt(0) == 'Q' || card.charAt(0) == 'K' || card.charAt(0) == '1') {
			tmp += 10;
		}
		else if (card.charAt(0) != 'A') {
			tmp += parseInt(card.charAt(0));
		}
	});
	// Aces are wild cards, they should be calculated at the end
	this.currentTurn.cards.forEach( function (card) {
		if (card.charAt(0) == 'A') {
			if (tmp + 11 > 21) {
				tmp += 1;
			}
			else {
				tmp += 11
			}
		}
	});
	return tmp;
};

User.prototype.bet = function(money) {
	this.money -= money;
	this.currentTurn.currentBet += money;
};

module.exports = User;

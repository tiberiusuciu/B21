var User = function(username, id) {
	this.id = id;
	this.username = username;
	this.money = 100;
	this.cards = [];
	this.currentValue = 0;
	this.currentBet = 0;
}

User.prototype.dealCards = function(newCards) {
	this.cards.push(...newCards);
	this.currentValue = this.evaluateCards();
};

User.prototype.evaluateCards = function(newCards) {
	var tmp = 0;
	this.cards.forEach( function (card) {
		if (card.charAt(0) == 'J' || card.charAt(0) == 'Q' || card.charAt(0) == 'K' || card.charAt(0) == '1') {
			tmp += 10;
		}
		else if (card.charAt(0) != 'A') {
			tmp += parseInt(card.charAt(0));
		}
	});
	// Aces are wild cards, they should be calculated at the end
	this.cards.forEach( function (card) {
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

module.exports = User;

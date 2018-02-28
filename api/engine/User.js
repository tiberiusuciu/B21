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
};

module.exports = User;

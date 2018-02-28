var User = function(username) {
	this.username = username;
	this.money = 100;
	this.cards = [];
}

User.prototype.dealCards = function(newCards) {
	this.cards.push(...newCards);
};

module.exports = User;

var _ = require('lodash');

var config = require('../../config.js');
var User = require('./User.js');
var Deck = require('./Deck.js');

// CurrentPhases: Betting, Dealing, Interactions, DealerTurn, Cleanup

function Game() {
	console.log('instanciating Game engine...');
	this.deck = new Deck(8);
	this.users = [];
	this.messages = [];
	this.currentPhase = '';
}

Game.prototype.addUser = function(username, id) {
	var user = new User(username, id);
	this.users.push(user);
	return user;
};

Game.prototype.removeUser = function(id) {
	for (var i = 0; i < this.users.length; i++) {
		if (this.users[i].id == id) {
			this.users.splice(i, 1);
			break;
		}
	}
};

Game.prototype.drawCards = function(amount) {
	var tmp = [];
	for (var i = 0; i < amount; i++) {
		tmp[i] = this.deck.cards[i];
		this.deck.cards.splice(i, 1);
	}
	return tmp;
};

Game.prototype.addMessageEntry = function(username, message) {
	var messageEntry = {
		username: username,
		message: message,
	};
	this.messages.push(messageEntry);
};

module.exports = Game;

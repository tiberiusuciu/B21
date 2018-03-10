var _ = require('lodash');

var config = require('../../config.js');
var User = require('./User.js');
var Deck = require('./Deck.js');

function Game() {
	console.log('instanciating Game engine...');
	this.deck = new Deck(1);
	this.users = [];
	this.dealer = new User('Dealer', -1);
	this.messages = [];
	this.currentPhase = '';
	this.firstCardDealt = false;
	this.currentPlayer = -1;
	this.currentUserId = -1;
	this.secondsPassed = 0;
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

// The 50 is 50 random cards at the bottom that will never get drawn in order to not go throught the whole deck
// This could prevent making the game predictable
Game.prototype.drawCards = function(amount) {
	if (amount + 50 >= this.deck.cards.length) {
		this.deck = new Deck(8);
	}
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

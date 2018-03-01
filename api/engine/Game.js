var _ = require('lodash');

var config = require('../../config.js');
var User = require('./User.js');
var Deck = require('./Deck.js');

// Pass down a specsheet which is essentially a save file of the game

function Game() {
	console.log('instanciating Game engine...');
	this.deck = new Deck(8);
	this.users = [];
}

// Game.prototype.commandReceived = function(command) {
// 	// Find the user
// 	// call his eat method
// 	// dispatch new method afterwards
// 	switch (command.command) {
// 		case config.commandNames.SAY:
// 			return { type: config.actionConst.NEW_LOG_ENTRY, meta: {remote: false}, source: command.source, content: _.join(command.params, ' ')};
// 		case config.commandNames.EAT:
// 			return { type: config.actionConst.NEW_LOG_ENTRY, meta: {remote: false}, source: command.source, content: command.source + " ate " + command.params[0] }
// 		default:
// 			return { type: config.actionConst.NEW_LOG_ENTRY, meta: {remote: false}, source: "Engine", content: "Something went wrong!"};
// 	}
// };

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

module.exports = Game;

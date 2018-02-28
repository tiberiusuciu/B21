var _ = require('lodash');

var config = require('../../config.js');
var User = require('./User.js');

// Pass down a specsheet which is essentially a save file of the game

function Game() {
	console.log('instanciating Game engine...');
	this.users = [];
	this.map = [];
	this.time = 0;
}

Game.prototype.commandReceived = function(command) {
	// Find the user
	// call his eat method
	// dispatch new method afterwards
	switch (command.command) {
		case config.commandNames.SAY:
			return { type: config.actionConst.NEW_LOG_ENTRY, meta: {remote: false}, source: command.source, content: _.join(command.params, ' ')};
		case config.commandNames.EAT:
			return { type: config.actionConst.NEW_LOG_ENTRY, meta: {remote: false}, source: command.source, content: command.source + " ate " + command.params[0] }
		default:
			return { type: config.actionConst.NEW_LOG_ENTRY, meta: {remote: false}, source: "Engine", content: "Something went wrong!"};
	}
};

Game.prototype.addUser = function(username) {
	var user = new User(username);
	this.users.push(user);
	return user;
};

module.exports = Game;

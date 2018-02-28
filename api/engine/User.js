var User = function(username) {
	this.username = username;
	this.inventory = {};
	this.stats = {};
	this.equipment = {}
	this.posX = 0;
	this.poxY = 0;
	this.health = 0;
}

module.exports = User;

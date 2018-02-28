// Dictionnary holds all possible commands
import config from '../../config.js';

var Dictionnary = {};

// @command SAY
// @description: say something specified after the command
// @param: 1 - infinity
Dictionnary[config.commandNames.SAY] = {
	minParams: 1,
	maxParams: Infinity,
	broadcast: true,
};

// @command EAT
// @description: eat something specified after the command
// @param: 1 - infinity
Dictionnary[config.commandNames.EAT] = {
	minParams: 1,
	maxParams: Infinity,
	broadcast: true,
};

// @command CLEAR
// @description: clears the logs on the terminallogs, it allows params, but it does nothing
// @param: none
// @note: Maybe add a param that could tell how many logs to clear?
Dictionnary[config.commandNames.CLEAR] = {
	minParams: 0,
	maxParams: Infinity,
	broadcast: false,
};


module.exports = Dictionnary;

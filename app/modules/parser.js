// Parser will validate coherence whathever user inputs.
// This does not validate if the command seems logical or not, that's the oracle's job

import Dictionnary from './dictionnary.js';
import config from '../../config.js';
import { split, toLower, slice, size, filter, each, trim } from 'lodash';

module.exports = {
	validate(source, content) {
		// making content universal
		let contentLowerCase = toLower(content);

		// Chained commands will need to be splitted by | or && before next block of code

		// extracting content
		let splitContent = split(contentLowerCase, " ");


		//Optimisization could be done here
		// Trim excess spaces
		splitContent = each(splitContent, (segment) => {
			return trim(segment);
		});

		// Removing extra spaces
		splitContent = filter(splitContent, (segment) => {
			return segment !== "";
		});


		let command = splitContent[0];

		// validating content
		if (Dictionnary[command]) {

			// extracting params and command
			let params = slice(splitContent, 1);
			let sizeParams = size(params);
			let dictionnaryCommand = Dictionnary[command];

			// validating params
			if(sizeParams >= dictionnaryCommand.minParams && sizeParams <= dictionnaryCommand.maxParams) {

				// HOTPATCH?
				// If command is SAY, we should maintain case sensitivity
				if(command === config.commandNames.SAY) {
					splitContent = split(content, " ");
					params = slice(splitContent, 1);
				}

				return {
					validCommand: true,
					broadcast: dictionnaryCommand.broadcast,
					command,
					params,
					source,
				};
			}
			return {
				validCommand: false,
				message: command + " command " + (sizeParams < dictionnaryCommand.minParams ? "needs at least " + dictionnaryCommand.minParams + " parameters" : "")
												+ (sizeParams > dictionnaryCommand.maxParams ? "needs no more than " + dictionnaryCommand.maxParams + " parameters" : ""),
				source,
			};
		}
		return {
			validCommand: false,
			message: command + " command does not exist",
			source,
		};
	},
};

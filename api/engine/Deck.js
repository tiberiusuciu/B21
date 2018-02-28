var Deck = function(deckAmount) {
	this.cards = this.randomize(this.generateDeck(deckAmount));
}

Deck.prototype.randomize = function(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

Deck.prototype.makeSuitCard = function(suit) {
  var temp = [];
  for (var i = 0; i < 13; i++) {
    if (i == 0) {
      temp[i] = 'A' + suit + '.png';
    }
    else if (i == 10) {
      temp[i] = 'J' + suit + '.png';
    }
    else if (i == 11) {
      temp[i] = 'Q' + suit + '.png';
    }
    else if (i == 12) {
      temp[i] = 'K' + suit + '.png';
    }
    else {
      temp[i] = i + 1 + suit + '.png';
    }
  }
  return temp;
};

Deck.prototype.generateDeck = function(deckAmount) {
  var tmp = [];

  for (var i = 0; i < deckAmount; i++) {
    tmp.push(...this.makeSuitCard('H'));
    tmp.push(...this.makeSuitCard('D'));
    tmp.push(...this.makeSuitCard('S'));
    tmp.push(...this.makeSuitCard('C'));
  }
  return tmp;
};

module.exports = Deck;

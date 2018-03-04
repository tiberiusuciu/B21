var express = require('express');
var path = require('path');
var webpackConfig = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleWare = require('webpack-dev-middleware');
var webpackHotMiddleWare = require('webpack-hot-middleware');
var Game = require('./engine/Game.js');
var config = require('../config.js');

var app = express();

app.use(express.static(__dirname + '/public'));

// Socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleWare(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleWare(compiler));

app.use(express.static('./dist'));

app.use('/', function (req, res) {
    res.sendFile(path.resolve('app/index.html'));
});

var port = 3000;

server.listen(port, function(error) {
	if (error) throw error;
	console.log("Express server listening on port", port);
});

// Oracle section
var game = new Game();
var id = 0;
io.on('connection', function (socket) {

	// Making new user here
	let user = game.addUser('Anonymous', id++);
  socket.emit('action', {type: config.actionConst.ASSIGN_ID, id: user.id});
	// socket.emit('action', {type: config.actionConst.NEW_USER, user});
	socket.emit('action', {type: config.actionConst.GAME_PHASE_CHANGE, currentPhase: game.currentPhase});
  socket.emit('action', {type: config.actionConst.UPDATE_DEALER, dealer: game.dealer});
  io.emit('action', {type: config.actionConst.UPDATE_USERS, users: game.users});
  socket.emit('action', {type: config.actionConst.UPDATE_MESSAGE_LOGS, messages: game.messages});

  // Game Turn Mechanics
  var dealHand = () => {
    if (game.currentPlayer < game.users.length) {
      if (game.users[game.currentPlayer].currentTurn.currentBet > 0) {
        game.currentUserId = game.users[game.currentPlayer].id;
        io.emit('action', {type: config.actionConst.UPDATE_CURRENT_USER_ID, currentUserId: game.currentUserId, currentPlayer: game.currentPlayer});
        game.users[game.currentPlayer].dealCards(game.drawCards(1));
        io.emit('action', {type: config.actionConst.UPDATE_USERS, users: game.users});
      }

      game.currentPlayer++;
      var haveNotFoundNext = true;
      while (haveNotFoundNext && game.currentPlayer < game.users.length) {
        if (game.users[game.currentPlayer].currentTurn.currentBet <= 0) {
          game.currentPlayer++;
        }
        else {
          haveNotFoundNext = false;
        }
      }
      setTimeout(dealHand, 500);
    }
    else if(game.firstCardDealt == false) {
      game.currentUserId = game.dealer.id;
      io.emit('action', {type: config.actionConst.UPDATE_CURRENT_USER_ID, currentUserId: game.currentUserId, currentPlayer: game.currentPlayer});
      game.dealer.dealCards(game.drawCards(1));
      io.emit('action', {type: config.actionConst.UPDATE_DEALER, dealer: game.dealer});
      setTimeout(() => {
        game.firstCardDealt = true;
        game.currentPlayer = 0;
        dealHand();
      }, 500)
    }
    else if(game.firstCardDealt == true) {
      game.dealer.dealCards(game.drawCards(1));
      io.emit('action', {type: config.actionConst.UPDATE_DEALER, dealer: game.dealer});
      // game.firstCardDealt = false;

      game.currentPlayer = 0;
      var haveNotFoundNext = true;
      while (haveNotFoundNext && game.currentPlayer < game.users.length) {
        if (game.users[game.currentPlayer].currentTurn.currentBet <= 0) {
          game.currentPlayer++;
        }
        else {
          haveNotFoundNext = false;
        }
      }
      game.currentUserId = game.users[game.currentPlayer].id;
      io.emit('action', {type: config.actionConst.UPDATE_CURRENT_USER_ID, currentUserId: game.currentUserId, currentPlayer: game.currentPlayer});

      game.currentPhase = "PLAYING";
      io.emit('action', {type: config.actionConst.GAME_PHASE_CHANGE, currentPhase: game.currentPhase});
    }
  };

  var awaitingBetting = () => {
    var canBeginTurn = false;
    game.users.map((user) => {
      if (user.currentTurn.currentBet > 0) {
        canBeginTurn = true;
      }
    });
    if (canBeginTurn && game.currentPhase == "BETTING") {
      game.currentPhase = "DEALING";
      game.currentPlayer = 0;
      game.currentUserId = game.users[game.currentPlayer].id;
      io.emit('action', {type: config.actionConst.GAME_PHASE_CHANGE, currentPhase: game.currentPhase});
      dealHand();
    }
    else {
      timer = setTimeout(awaitingBetting, 15000);
    }
  };

  // CurrentPhases: Betting, Dealing, Interactions, DealerTurn, Cleanup
  if (game.currentPhase == '' && game.users.length > 0) {
    game.currentPhase = "BETTING";
    io.emit('action', {type: config.actionConst.GAME_PHASE_CHANGE, currentPhase: game.currentPhase});
    var timer;
    timer = setTimeout(awaitingBetting, 15000);
  }

  var checkForAllUserBets = () => {
    var canBeginTurn = true;
    game.users.map((user) => {
      if (user.currentTurn.currentBet <= 0) {
        canBeginTurn = false;
      }
    });
    if (canBeginTurn) {
      awaitingBetting();
    }
  };

  var dealDealer = () => {
    if (game.dealer.currentTurn.currentValue < 17) {
      game.dealer.dealCards(game.drawCards(1));
      io.emit('action', {type: config.actionConst.UPDATE_DEALER, dealer: game.dealer});
      setTimeout(dealDealer, 800);
    }
    else if (game.dealer.currentTurn.currentValue > 21) {
      game.dealer.currentTurn.hasBust = true;
      game.users.map((user) => {
        if(!user.currentTurn.hasBust) {
          user.money += user.currentTurn.currentBet * 2;
          console.log('GIVING DA MONEY', user.currentTurn.currentBet * 2);
        }
        user.currentTurn = {
      		cards: [],
      		currentValue: 0,
      		currentBet: 0,
      		hasPlayed: false,
      		hasBust: false,
      		hasDoubled: false,
      		hasBlackJack: false,
      	};
      });
      game.dealer.currentTurn = {
        cards: [],
        currentValue: 0,
        currentBet: 0,
        hasPlayed: false,
        hasBust: false,
        hasDoubled: false,
        hasBlackJack: false,
      };
      setTimeout(() => {
        io.emit('action', {type: config.actionConst.UPDATE_USERS, users: game.users});
        io.emit('action', {type: config.actionConst.UPDATE_DEALER, dealer: game.dealer});
        game.currentPhase = "BETTING";
        game.firstCardDealt = false;
        io.emit('action', {type: config.actionConst.GAME_PHASE_CHANGE, currentPhase: game.currentPhase});
        setTimeout(awaitingBetting, 15000);
      }, 3000)
    }
    else {
      game.users.map((user) => {
        if(!user.currentTurn.hasBust) {
          if (user.currentTurn.currentValue > game.dealer.currentTurn.currentValue) {
            user.money += user.currentTurn.currentBet * 2;
          }
          else if (user.currentTurn.currentValue == game.dealer.currentTurn.currentValue) {
            user.money += user.currentTurn.currentBet;
          }
        }
        user.currentTurn = {
          cards: [],
          currentValue: 0,
          currentBet: 0,
          hasPlayed: false,
          hasBust: false,
          hasDoubled: false,
          hasBlackJack: false,
        };
      });
      game.dealer.currentTurn = {
        cards: [],
        currentValue: 0,
        currentBet: 0,
        hasPlayed: false,
        hasBust: false,
        hasDoubled: false,
        hasBlackJack: false,
      };
      setTimeout(() => {
        io.emit('action', {type: config.actionConst.UPDATE_USERS, users: game.users});
        io.emit('action', {type: config.actionConst.UPDATE_DEALER, dealer: game.dealer});
        game.currentPhase = "BETTING";
        game.firstCardDealt = false;
        io.emit('action', {type: config.actionConst.GAME_PHASE_CHANGE, currentPhase: game.currentPhase});
        setTimeout(awaitingBetting, 15000);
      }, 5000)
    }
    // game.dealer.dealCards(game.drawCards(1));
    // io.emit('action', {type: config.actionConst.UPDATE_DEALER, dealer: game.dealer});
    //
  };

	socket.on("action", function (action) {
		switch (action.type) {
			case config.actionConst.USER_HIT:
        user.dealCards(game.drawCards(1));
        io.emit('action', {type: config.actionConst.UPDATE_USERS, users: game.users});
        break;
      case config.actionConst.USER_DOUBLE:
        user.dealCards(game.drawCards(1));
        user.money -= user.currentTurn.currentBet;
        user.currentTurn.currentBet *= 2;
        io.emit('action', {type: config.actionConst.UPDATE_USERS, users: game.users});
        if (game.currentPlayer + 1 <= game.users.length - 1) {
          // Find next user who has bets
          game.currentPlayer++;
          var haveNotFoundNext = true;
          while (haveNotFoundNext && game.currentPlayer < game.users.length) {
            if (game.users[game.currentPlayer].currentTurn.currentBet <= 0) {
              game.currentPlayer++;
            }
            else {
              haveNotFoundNext = false;
            }
          }
          if (haveNotFoundNext) {
            // End playing phase
            console.log('Ending playing phase...');
            game.currentPhase = "DEALER_TURN";
            io.emit('action', {type: config.actionConst.GAME_PHASE_CHANGE, currentPhase: game.currentPhase});

            game.currentPlayer = -1;
            game.currentUserId = game.dealer.id;
            io.emit('action', {type: config.actionConst.UPDATE_CURRENT_USER_ID, currentUserId: game.currentUserId, currentPlayer: game.currentPlayer});

            setTimeout(dealDealer, 1000);
          }
          else {
            game.currentUserId = game.users[game.currentPlayer].id;
            io.emit('action', {type: config.actionConst.UPDATE_CURRENT_USER_ID, currentUserId: game.currentUserId, currentPlayer: game.currentPlayer});
          }
        }
        else {
          // End playing phase
          console.log('Ending playing phase...');
          game.currentPhase = "DEALER_TURN";
          io.emit('action', {type: config.actionConst.GAME_PHASE_CHANGE, currentPhase: game.currentPhase});

          game.currentPlayer = -1;
          game.currentUserId = game.dealer.id;
          io.emit('action', {type: config.actionConst.UPDATE_CURRENT_USER_ID, currentUserId: game.currentUserId, currentPlayer: game.currentPlayer});

          setTimeout(dealDealer, 1000);
        }
        break;
			case config.actionConst.USER_HOLD:
        // user.dealCards(game.drawCards(1));
        // socket.emit('action', {type: config.actionConst.UPDATE_USER, user});
        // io.emit('action', {type: config.actionConst.UPDATE_USERS, users: game.users});
        if (game.currentPlayer + 1 <= game.users.length - 1) {
          // Find next user who has bets
          game.currentPlayer++;
          var haveNotFoundNext = true;
          while (haveNotFoundNext && game.currentPlayer < game.users.length) {
            if (game.users[game.currentPlayer].currentTurn.currentBet <= 0) {
              game.currentPlayer++;
            }
            else {
              haveNotFoundNext = false;
            }
          }
          if (haveNotFoundNext) {
            // End playing phase
            console.log('Ending playing phase...');
            game.currentPhase = "DEALER_TURN";
            io.emit('action', {type: config.actionConst.GAME_PHASE_CHANGE, currentPhase: game.currentPhase});

            game.currentPlayer = -1;
            game.currentUserId = game.dealer.id;
            io.emit('action', {type: config.actionConst.UPDATE_CURRENT_USER_ID, currentUserId: game.currentUserId, currentPlayer: game.currentPlayer});

            setTimeout(dealDealer, 1000);
          }
          else {
            game.currentUserId = game.users[game.currentPlayer].id;
            io.emit('action', {type: config.actionConst.UPDATE_CURRENT_USER_ID, currentUserId: game.currentUserId, currentPlayer: game.currentPlayer});
          }
        }
        else {
          // End playing phase
          console.log('Ending playing phase...');
          game.currentPhase = "DEALER_TURN";
          io.emit('action', {type: config.actionConst.GAME_PHASE_CHANGE, currentPhase: game.currentPhase});

          game.currentPlayer = -1;
          game.currentUserId = game.dealer.id;
          io.emit('action', {type: config.actionConst.UPDATE_CURRENT_USER_ID, currentUserId: game.currentUserId, currentPlayer: game.currentPlayer});

          setTimeout(dealDealer, 1000);
        }

        break;
      case config.actionConst.USER_MESSAGE_SUBMIT:
        game.addMessageEntry(user.username, action.message);
        io.emit('action', {type: config.actionConst.UPDATE_MESSAGE_LOGS, messages: game.messages});
        break;
      case config.actionConst.USER_PLACE_BET:
        user.bet(action.money);
        socket.emit('action', {type: config.actionConst.UPDATE_USER, user});
        io.emit('action', {type: config.actionConst.UPDATE_USERS, users: game.users});
        checkForAllUserBets();
        break;
      default:
        break;
		}
	})

	socket.on("disconnect", function () {
    game.removeUser(user.id);
    io.emit('action', {type: config.actionConst.UPDATE_USERS, users: game.users});
		console.log('A user has disconnected!');
	})
});

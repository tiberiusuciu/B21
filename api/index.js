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
  user.dealCards(game.drawCards(2));
	socket.emit('action', {type: config.actionConst.NEW_USER, user, currentPhase: game.currentPhase});
  io.emit('action', {type: config.actionConst.UPDATE_USERS, users: game.users});
  socket.emit('action', {type: config.actionConst.UPDATE_MESSAGE_LOGS, messages: game.messages});

	socket.on("action", function (action) {
		switch (action.type) {
			case config.actionConst.USER_HIT:
        user.dealCards(game.drawCards(1));
        socket.emit('action', {type: config.actionConst.UPDATE_USER, user});
        io.emit('action', {type: config.actionConst.UPDATE_USERS, users: game.users});
				// let response = game.commandReceived(action.parsedCommand);
				// io.emit('action', response);
        break;
      case config.actionConst.USER_MESSAGE_SUBMIT:
        game.addMessageEntry(user.username, action.message);
        io.emit('action', {type: config.actionConst.UPDATE_MESSAGE_LOGS, messages: game.messages});
        break;
      case config.actionConst.USER_PLACE_BET:
        user.bet(action.money);
        socket.emit('action', {type: config.actionConst.UPDATE_USER, user});
        io.emit('action', {type: config.actionConst.UPDATE_USERS, users: game.users});
        break;
		}
	})

	socket.on("disconnect", function () {
    game.removeUser(user.id);
    io.emit('action', {type: config.actionConst.UPDATE_USERS, users: game.users});
		console.log('A user has disconnected!');
	})
});

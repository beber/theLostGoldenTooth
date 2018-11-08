var express = require('express');
var app = new express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(8080);

var Players = require(__dirname + '/module/Core/Players');
var Player = require(__dirname + '/module/Model/Player');

var players = new Players();

var rooms = [];

app.use('/dist', express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function (socket) {
    var player = new Player(socket);
    players.addPlayer(player);


    socket.on('init', function () {

    });

    socket.on('disconnect', function () {
        player = players.getPlayer(player);
        players.removePlayer(player);
        socket.broadcast.emit('disconnect player', player);
    });

    loadEvents(socket);
});


function loadEvents(socket) {

}
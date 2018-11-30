let express = require('express');
let es6Renderer = require('express-es6-template-engine');
let app = new express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
server.listen(8080);

let Players = require( __dirname + '/module/Core/Players');
let Player = require( __dirname + '/module/Model/Player');

let players = new Players();

app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');
app.use(express.static('public'));

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/mobile', function (req, res) {
    res.render('mobile', {locals: {code: req.query.code}});
});

io.on('connection', function (socket) {
	let player = new Player( socket );
	players.addPlayer( player );	


	socket.on('init', function (data){
		player.type = data.type;

		if (data.code === undefined) {
			let code = makeid(8);
			player.code = code;

			socket.emit('init', {code: code});
		} else {
			let partner = players.getPlayerFromCode(data.code);

			if (null !== partner) {
                player.partner = partner;
                partner.partner = player;

                player.socket.emit('sync', {player: player.id});
                partner.socket.emit('sync', {player: partner.id});
            }
		}
	});

	socket.on('message', function (data) {
		if (undefined === player.partner) {
			return;
		}

	    player.partner.socket.emit('message', data);
    });

	socket.on('disconnect', function () {
	    if (player.partner !== undefined) {
            player.partner.socket.emit('leave');
            player.partner.partner = undefined;
        }

        players.removePlayer(player);
	    
	    console.log(players);
	});

});

function makeid(size) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

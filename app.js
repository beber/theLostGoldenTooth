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


	socket.on('init',function(){
		
	});

	socket.on('disconnect', function () {
		player = players.getPlayer( player );
		players.removePlayer( player );
		socket.broadcast.emit('disconnect player', player );
	});

	loadEvents( socket );
});

function loadEvents( socket ){
	
}
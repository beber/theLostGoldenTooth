var socket = io.connect('http://web.gt:8080/');

socket.emit('init');

socket.on('init', function ( data ) {
	
});


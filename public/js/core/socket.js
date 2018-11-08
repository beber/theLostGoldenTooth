var socket = io.connect('http://web.tlgt:8080/');

socket.emit('init');

socket.on('init', function ( data ) {
	
});


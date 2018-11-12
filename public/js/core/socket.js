var socket = io.connect('http://web.tlgt:8080/');

socket.emit('init', playerInformation);

socket.on('init', function ( data ) {
	if (data.code !== undefined) {
        document.getElementById('link').innerHTML = '<a target="_blank" href="http://web.tlgt:8080/mobile?code=' + data.code + '">go to mobile</a>';
    }
});

socket.on('sync', function ( data ) {
    console.log("your are sync with: " + data.player);

    if ('mage' === playerInformation.type) {
        socket.emit('message', {message: 'Bonjour, je suis le mage'});
    }
});

socket.on('message', function ( data ) {
    alert(data.message);
});


socket.on('leave', function() {
   alert('Your partner is disconnected');
});
var Player = function( socket ){
	this.id = getId();
	this.socketId = socket.id;
}




function getId(){
	var d = new Date();
	return Math.round( Math.random() * 100000 ) + d.getTime();
}

module.exports = Player;

var Players = function(){
	
	this.list = [];
}

Players.prototype.addPlayer = function( player ){
	this.list.push( player );
}

Players.prototype.removePlayer = function( player ){
	for( var i in this.list ){
		if( this.list[i].id == player.id ) {
			this.list.splice(i,1);
			break;
		}
	}
}

Players.prototype.updatePlayer = function( player ){
	for( var i in this.list ){
		if( this.list[i].id == player.id ) {
			this.list[i] = player;
			break;
		}
	}
}

Players.prototype.getPlayer = function( player ){
	for( var i in this.list ){
		if( this.list[i].id == player.id ) return this.list[i];
	}
}

module.exports = Players;
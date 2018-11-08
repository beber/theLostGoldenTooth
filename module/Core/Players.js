class Players {

    constructor()
    {
	    this.list = [];
    }

    addPlayer( player )
    {
        console.log("New player");
        this.list.push( player );
    }

    removePlayer( player )
    {
        for( let i in this.list ){
            if( this.list[i].id == player.id ) {
                this.list.splice(i,1);
                break;
            }
        }
    }

    updatePlayer( player )
    {
        for( let i in this.list ){
            if( this.list[i].id == player.id ) {
                this.list[i] = player;
                break;
            }
        }
    }

    getPlayer( player )
    {
        for( let i in this.list ){
            if( this.list[i].id == player.id ) return this.list[i];
        }
    }
}

module.exports = Players;
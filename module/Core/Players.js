class Players {

    constructor()
    {
	    this.list = [];
    }

    addPlayer( player )
    {
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

    getPlayerFromCode( code )
    {
        for( let i in this.list ){
            if( this.list[i].code == code && this.list[i].partner == undefined ) return this.list[i];
        }

        return null;
    }
}

module.exports = Players;
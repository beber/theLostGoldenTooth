class Player {

	constructor(socket)
    {
        let d = new Date();
        this.id = Math.round( Math.random() * 100000 ) + d.getTime();
        this.socketId = socket.id;
    }

    set type(type)
    {
        this.type = type;
    }

    get type()
    {
        return this._type
    }

    set partner(partner)
    {
        this.partner = partner;
    }

    get partner()
    {
        return this._partner;
    }
}

module.exports = Player;

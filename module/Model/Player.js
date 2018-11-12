class Player {

	constructor(socket)
    {
        let d = new Date();
        this.id = Math.round( Math.random() * 100000 ) + d.getTime();
        this.socket = socket;
    }

    set type(type)
    {
        this._type = type;
    }

    get type()
    {
        return this._type
    }

    set partner(partner)
    {
        this._partner = partner;
    }

    get partner()
    {
        return this._partner;
    }

    set code(code)
    {
        this._code = code;
    }

    get code()
    {
        return this._code;
    }
}

module.exports = Player;

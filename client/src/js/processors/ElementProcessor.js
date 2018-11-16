export default class {
    constructor(game)
    {
        this.game = game;
    }

    execute(data)
    {
        this.game.hudController.update('element', data.value);
    }
}
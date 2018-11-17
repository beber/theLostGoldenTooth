export default class {
    constructor(game, spellsConfig)
    {
        this.game = game;
        this.spellsConfig = spellsConfig;
        this.spells = {};

        this.loadSpells();
    }

    loadSpells() {
        for (let i in this.spellsConfig) {
            console.log('../spells/' + this.spellsConfig[i].element + '/' + this.spellsConfig[i].class);
            import('../spells/' + this.spellsConfig[i].element + '/' + this.spellsConfig[i].class).then((spell) => {
                console.log(spell);
            });
        }
    }

    execute(data)
    {
        console.log(data);
    }
}
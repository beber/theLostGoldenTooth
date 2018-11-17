export default class {
    constructor(game, spellsConfig)
    {
        this.game = game;
        this.spellsConfig = spellsConfig;
        this.spells = {};

        this.loadSpells();
    }

    loadSpells() {
        console.log('pwet', this.spellsConfig);
        for (let i in this.spellsConfig) {
            let path = '../spells/' + this.spellsConfig[i].element + '/' + this.spellsConfig[i].class;
            import(path).then((e) => {
                console.log(e);
            });
        }
    }

    execute(data)
    {
        console.log(data);
    }
}
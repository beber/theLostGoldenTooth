export default class {
    constructor(scene, spellsConfig)
    {
        this.scene = scene;
        this.spellsConfig = spellsConfig;
        this.spells = {};

        this.loadSpells();
    }

    loadSpells() {
        for (let i in this.spellsConfig) {
            import('../spells/' + this.spellsConfig[i].element + '/' + this.spellsConfig[i].class).then((spell) => {
                this.spells[this.spellsConfig[i].name] = new spell.default(this.scene);
            });
        }

        console.log(this.spells);
    }

    execute(data)
    {
        console.log(data);
        console.log(this.spells);
        if (undefined === this.spells[data.value.name]) {
            return;
        }

        this.spells[data.value.name].execute();
    }
}
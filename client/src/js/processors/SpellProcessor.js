export default class {
    constructor(scene, spellsConfig)
    {
        this.scene = scene;
        this.spellsConfig = spellsConfig;
        this.spells = {};
    }

    preload() {
        for (let i in this.spellsConfig) {
            import('../spells/' + this.spellsConfig[i].element + '/' + this.spellsConfig[i].class).then((spell) => {
                this.spells[this.spellsConfig[i].name] = new spell.default(this.scene);
                this.spells[this.spellsConfig[i].name].preload();
            });
        }
    }

    execute(data)
    {
        if (undefined === this.spells[data.value.name]) {
            return;
        }

        this.spells[data.value.name].execute();
    }

    update() {
        for (let i in this.spells) {
            this.spells[i].update();
        }
    }
}
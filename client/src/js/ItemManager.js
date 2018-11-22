export default class {
    constructor(scene, itemsConfig)
    {
        this.itemsConfig = itemsConfig;
        this.items = {};

        for(let i in this.itemsConfig) {
            console.log(this.itemsConfig[i]);
            console.log('./items/' + this.itemsConfig[i].class);
            import('./items/' + this.itemsConfig[i].class).then((item) => {
                console.log(item);
                this.items[this.itemsConfig[i].name] = new item.default(this.scene, this.spellsConfig[i]);
                console.log(this.items[this.itemsConfig[i].name]);
                this.items[this.itemsConfig[i].name].preload();
            });
        }
    }

    dropItem(entity) {
        console.log(entity, this.items);
    }
}
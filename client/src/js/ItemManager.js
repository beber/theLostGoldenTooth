export default class {
    constructor(scene, itemsConfig)
    {
        this.scene = scene;
        this.itemsConfig = itemsConfig;
        this.items = {};

        for(let i in this.itemsConfig) {
            import('./items/' + this.itemsConfig[i].class).then((item) => {
                this.items[this.itemsConfig[i].name] = new item.default(this.scene, this.itemsConfig[i]);
                this.items[this.itemsConfig[i].name].preload();
            });
        }
    }

    dropItem(entity) {
        for (let i in this.itemsConfig) {
            let n = Math.random();
            for (let j in this.itemsConfig[i].rate) {
                console.log(j, entity.className);
                if (j === entity.className && n >= this.itemsConfig[i].rate[j]) {
                    return this.createItem(entity, this.items[this.itemsConfig[i].name]);
                }
            }
        }
    }

    createItem(entity, item) {
        item.create(entity.x, entity.y);
    }
}
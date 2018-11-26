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
            if (undefined === this.itemsConfig[i].rate) {
console.log(this.scene.goblins);
                if ('key' === this.itemsConfig[i].name && 0 === this.scene.goblins.length) {
                    return this.createItem(entity, this.items[this.itemsConfig[i].name]);
                }

                continue;
            }

            let n = Math.random();
            for (let j in this.itemsConfig[i].rate) {
                if (j === entity.className && n <= this.itemsConfig[i].rate[j]) {
                    return this.createItem(entity, this.items[this.itemsConfig[i].name]);
                }
            }
        }
    }

    createItem(entity, item) {
        item.create(entity.x, entity.y);
    }
}
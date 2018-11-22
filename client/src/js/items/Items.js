export default class {
    constructor(scene, config)
    {
        this.scene = scene;
        this.rate = config.rate;
        this.spriteConfig = config.sprite;
        this.entities = [];
    }

    create(x, y) {

        let item = this.createItem(x, y);

        this.entities.push(item);
    }
}
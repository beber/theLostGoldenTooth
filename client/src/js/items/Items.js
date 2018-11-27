export default class {
    constructor(scene, config)
    {
        this.scene = scene;

        if (undefined !== config.rate) {
            this.rate = config.rate;
        }

        this.spriteConfig = config.sprite;
        this.entities = [];
    }

    create(x, y) {
        let item = this.createItem(x, y);

        this.setCollisions(item);
        this.entities.push(item);
    }

    setCollisions(item) {
        this.scene.physics.add.overlap(item, this.scene.wizard.entity, (item, wizard) => {
            this.catchItem(item);
        });
    }
}
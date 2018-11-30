import Items from "./Items";

export default class extends Items {
    constructor(scene, config) {
        super(scene, config);
    }

    preload() {
        this.scene.anims.create({
            key: 'key',
            frames: this.scene.anims.generateFrameNumbers('keys', {start: this.spriteConfig.start, end: this.spriteConfig.end}),
            frameRate: this.spriteConfig.end - this.spriteConfig.start + 1,
            showOnStart: true,
            hideOnComplete: false,
            repeat: -1
        });
    }

    createItem(x, y) {
        let item = this.scene.add.sprite(32, 32, 'key');
        item.obj = this;
        item.sid = this.entities.length;
        item.health = 50;
        this.scene.physics.world.enable(item);

        item.x = x;
        item.y = y;
        item.body.setCollideWorldBounds(true);
        item.body.enable = true;

        this._setCollisions(item);

        item.anims.play('key');

        return item;
    }

    _setCollisions(item) {
        for (let layer in this.scene.levelManager.physicsLayer) {
            this.scene.physics.add.collider(item, this.scene.levelManager.physicsLayer[layer]);
        }
    }

    catchItem(item) {
        this.scene.physics.world.disable(item);
        item.setScrollFactor(0);
        item.x = 50;
        item.y = 90;
    }
}
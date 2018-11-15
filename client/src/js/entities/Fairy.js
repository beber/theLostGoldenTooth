export default class Fairy {
    constructor(scene) {
        this.scene = scene;
        this.entity = null;
        this.health = 100;
        this.mana = 100;
    }

    create() {
        this.entity = this.scene.add.sprite(50, 500, 'fairy');
        this.setAnimation();
        this.entity.play('fairy-left')
    }

    update() {

    }

    setAnimation() {
        this.scene.anims.create({
            key: 'fairy-left',
            frames: this.scene.anims.generateFrameNumbers('fairy', {start: 0, end: 2}),
            frameRate: 15,
            repeat: -1
        });

    }
}
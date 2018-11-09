export default class Wizard {
    constructor(scene) {
        this.scene = scene;
        this.entity = null;
        this.texture = null;
        this.health = 100;
        this.mana = 100;
    }

    create() {
        this.entity = this.scene.add.container(100, 530);
        this.texture = this.scene.add.sprite(5, -10, 'texture');
        this.entity.add(this.texture);
        this.entity.setSize(35, 70);
        this.scene.physics.world.enable(this.entity);
        this.scene.physics.add.collider(this.entity, this.scene.physics.world);
        this.entity.body.setCollideWorldBounds(true);
        this.setAnimation();
        this.texture.play('wizard-idle');
    }

    setAnimation() {
        let idleFrameNames = this.scene.anims.generateFrameNames('wizard', {
            prefix: '1_IDLE_',
            suffix: '.png',
            end: 4,
            zeroPad: 3
        });
        this.scene.anims.create({
            key: 'wizard-idle',
            frames: idleFrameNames,
            frameRate: 10,
            repeat: -1
        })
    }

    // Update function call in Scene update loop
    update() {

    }
}
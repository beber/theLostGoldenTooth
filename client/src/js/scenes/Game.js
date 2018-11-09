import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
        this.animsLaunch = false;
    }

    preload() {

    }

    create() {
        // Create characters, map and others things
        this.wizard = this.add.container(100, 100);
        this.wizardTexture = this.add.sprite(25, 20, 'wizardTexture');
        this.wizard.add(this.wizardTexture);
        this.wizardTexture.setSize(100, 250);
        this.physics.world.enable(this.wizard);
        this.physics.add.collider(this.wizard, this.physics.world);
        this.wizard.body.setCollideWorldBounds(true);
        this.setAnimation();
        this.wizardTexture.play('idle').setScale(.25);
    }

    update() {
// Update characters, map and others things
    }

    setAnimation() {
        let frameNames = this.anims.generateFrameNames('wizard', {
            prefix: '1_IDLE_',
            suffix: '.png',
            end: 4,
            zeroPad: 3
        });
        this.anims.create({
            key: 'idle',
            frames: frameNames,
            frameRate: 10,
            repeat: -1
        })
    }
}
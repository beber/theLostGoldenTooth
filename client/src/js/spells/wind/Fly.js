import Spell from '../Spell';

export default class extends Spell {
    constructor(scene) {
        super(scene);
        
        this.cost = 10;
    }

    preload() {
        this.scene.anims.create({
            key: 'wizard-fly',
            frames: this.scene.anims.generateFrameNumbers('spell-fly', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
    }

    launch() {
        if (!this.scene.wizard.entity.body.onFloor()) {
            return -1;
        }

        let spell = this.scene.add.sprite(0, 0, 'spell-fly');
        spell.anims.play('wizard-fly');

        this.scene.wizard.entity.add(spell);
        this.scene.wizard.entity.body.setVelocityY(-1050);

        setTimeout(() => {
            spell.destroy();
        }, 500);
    }

    update() {

    }
}

import Spell from "../Spell";
import Wizard from "../../entities/Wizard";

export default class extends Spell {
    constructor(scene) {
        super(scene);

        this.cost = -2;
        this.spell = null;
    }

    preload() {
        this.scene.anims.create({
            key: 'wizard-aura',
            frames: this.scene.anims.generateFrameNumbers('spell-aura', {start: 0, end: 34}),
            frameRate: 35,
            repeat: -1
        });
    }

    launch() {
        if (null !== this.spell) {
            return -1;
        }

        this.scene.wizard.currentState = Wizard.STATE.aura;

        this.spell = this.scene.add.sprite(0, 0, 'spell-aura');
        this.spell.setAlpha(0.7);
        this.spell.anims.play('wizard-aura');

        this.timer = this.scene.time.addEvent({delay: 500, callback: this.tick, callbackScope: this, loop: true})
        this.scene.wizard.entity.add(this.spell);
    }

    tick() {
        this.scene.wizard.mana -= this.cost;
        this.scene.hudController.elements.mana.update();
    }

    update() {
        if (null !== this.spell && !this.scene.wizard.ISIDLE && !this.scene.wizard.HASAURA) {
            this.spell.destroy();
            this.timer.destroy();
            this.spell = null;
            this.timer = null;
        }
    }
}
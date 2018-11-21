import Spell from "../Spell";

export default class extends Spell{
    constructor(scene) {
        super(scene);
    }

    preload() {
        this.scene.anims.create({
            key: 'wizard-break',
            frames: this.scene.anims.generateFrameNumbers('spell-break', {start: 0, end: 15}),
            frameRate: 60,
            showOnStart: true,
            hideOnComplete: true
        });

        console.log('break loaded');
    }

    execute() {
        let spell = this.scene.add.sprite(200, 3000, 'spell-break');
        this.scene.physics.world.enable(spell);
        this.scene.physics.add.overlap(spell, this.scene.levelManager.panels, function (spell, object) {
            object.destroy()
        });
        spell.body.allowGravity = false;
        spell.body.enable = true;
        spell.x = this.scene.cameras.main.scrollX + this.scene.game.input.mousePointer.x;
        spell.y = this.scene.cameras.main.scrollY + this.scene.game.input.mousePointer.y;
        spell.anims.play('wizard-break');
        spell.on('animationcomplete', () => {
            spell.destroy();
        })
    }

    update() {

    }
}
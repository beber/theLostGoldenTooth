import Spell from '../Spell';
import Phaser from 'phaser';

export default class extends Spell
{
    constructor(scene) {
        super(scene);

        this.speed = 500;

        this.entities = new Array();
    }

    preload() {
        this.scene.anims.create({
            key: 'wizard-fireball',
            frames: this.scene.anims.generateFrameNumbers('spell-fireball', {start: 0, end: 5}),
            frameRate: 6,
            showOnStart: true,
            hideOnComplete: false,
            repeat: -1
        });

        console.log('fireball loaded');
    }

    execute() {
        console.log('fireball !!!');

        let spell = this.initSpelll();

        spell.angle = this.calculateAngle(spell);

        this.loadCollisions(spell);

        spell.anims.play('wizard-fireball');
        this.entities.push(spell);

        this.scene.physics.moveTo(spell,
            this.scene.cameras.main.scrollX + this.scene.game.input.mousePointer.x,
            this.scene.cameras.main.scrollY + this.scene.game.input.mousePointer.y,
            this.speed
        );
    }

    initSpelll() {
        let spell = this.scene.add.sprite(83, 83, 'spell-fireball');
        spell.obj = this;
        spell.sid = this.entities.length;

        this.scene.physics.world.enable(spell);

        spell.x = this.scene.wizard.entity.x + 20;
        spell.y = this.scene.wizard.entity.y;
        spell.body.setSize(43,43);
        spell.body.setOffset(20,20);
        spell.body.enable = false;
        spell.body.allowGravity = false;
        spell.body.setCollideWorldBounds(true);
        spell.body.enable = true;

        return spell;
    }

    loadCollisions(spell) {
        this.scene.physics.add.overlap(spell, this.scene.goblin.entity, (spell, object) => {
            object.destroy();
            this.entities.splice(spell.sid, 1);
            spell.destroy();

        });
    }

    calculateAngle(spell) {
        return Phaser.Math.Angle.BetweenPoints(
            new Phaser.Geom.Point(spell.x, spell.y),
            new Phaser.Geom.Point(
                this.scene.cameras.main.scrollX + this.scene.game.input.mousePointer.x,
                this.scene.cameras.main.scrollY + this.scene.game.input.mousePointer.y
            )
        ) * 180 / Math.PI;
    }

    update(){

    }
}
import Spell from '../Spell';
import Phaser from 'phaser';

export default class extends Spell {
    constructor(scene) {
        super(scene);

        this.speed = 500;

        this.entities = [];
    }

    preload() {
        this.scene.anims.create({
            key: 'wizard-fireball',
            frames: this.scene.anims.generateFrameNumbers('spell-fireball', {start: 0, end: 5}),
            frameRate: 24,
            showOnStart: true,
            hideOnComplete: false,
            repeat: -1
        });
    }

    execute() {
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
        spell.damage = 50;
        this.scene.physics.world.enable(spell);

        spell.x = this.scene.wizard.entity.x + 20;
        spell.y = this.scene.wizard.entity.y;
        spell.body.setSize(3, 3);
        spell.body.setOffset(40, 40);
        spell.body.enable = false;
        spell.body.allowGravity = false;
        spell.body.setCollideWorldBounds(true);
        spell.body.enable = true;

        return spell;
    }

    loadCollisions(spell) {
        for (let layer in this.scene.levelManager.physicsLayer) {
            this.scene.physics.add.collider(spell, this.scene.levelManager.physicsLayer[layer], (fireball, object) => {
                fireball.destroy();
            });
        }

        this.scene.physics.add.collider(spell, this.scene.levelManager.panels, (fireball, object) => {
            fireball.destroy();
        });

        this.scene.physics.add.collider(spell, this.scene.goblins, (fireball, goblin) => {
            goblin.hit(spell.damage);
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

    update() {

    }
}
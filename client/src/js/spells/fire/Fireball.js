import Spell from '../Spell';
import Phaser from 'phaser';

export default class extends Spell
{
    constructor(scene) {
        super(scene);

        this.duration = 50;
        this.speed = 600;
        this.fireRate = 500;

        this.spell = window.game.add.group();
        this.spell.enableBody = true;
        window.game.physics.enable(this.spell, Phaser.Physics.Arcade.ArcadePhysics);
        // this.spell.createMultiple(50, 'fireball');
        // this.spell.setAll('checkWorldBounds', true);
        // this.spell.setAll('outOfBoundsKill', true);

        console.log('fireball loaded');
    }

    execute() {
        console.log('fireball');
        //
        // this.initSpell( this.scene.wizard.entity.x, this.scene.wizard.entity.y );
        //
        // this.scene.physics.arcade.moveToPointer(this.entity, this.speed);
        // this.entity.rotation = this.scene.physics.arcade.angleToPointer(this.entity);
    }

    initSpell(s_x,s_y){
        if (this.scene.time.now <= this.nextFire || this.spell.countDead() <= 0) return false;
        this.nextFire = this.scene.time.now + this.fireRate;

        this.entity = this.spell.getFirstDead();
        this.entity.animations.add('fire',[0,1,2,3,4,5]);
        this.entity.animations.play('fire', 24, true);

        this.entity.reset(s_x, s_y);

        this.entity.anchor.setTo(0.5,0.5);
        this.entity.body.allowGravity = false;

        this.entity.obj = this;
    }

    update(){

    }
}
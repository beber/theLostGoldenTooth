export default class Wizard {
    constructor(scene) {
        this.scene = scene;
        this.entity = null;
        this.texture = null;
        this.xVelocity = 300;
        this.health = 100;
        this.mana = 100;
        this.spawn = {
            x: 410,
            y: 3150
        }
        this.currentState = Wizard.STATE.idle;
        this.direction = Wizard.DIRECTION.right;
        this.isAttacking = false;
        this.attackDelay = 1000;
        this.lastAttackTime = Date.now();
    }

    setSpawn(x, y) {
        this.spawn = {
            x: x,
            y: y
        }
    }

    create() {
        this.entity = this.scene.add.container(this.spawn.x, this.spawn.y);
        this.texture = this.scene.add.sprite(5, -10, 'texture');
        this.entity.add(this.texture);
        this.entity.setSize(35, 55);
        this.scene.physics.world.enable(this.entity);
        this.scene.physics.add.collider(this.entity, this.scene.physics.world);
        this.entity.body.setCollideWorldBounds(true);
        this._setCollisions();
        this.setAnimationWizard();
        this._listenInputsSpellsDev();

    }

    _setCollisions() {
        for (let layer in this.scene.levelManager.physicsLayer) {
            this.scene.physics.add.collider(this.entity, this.scene.levelManager.physicsLayer[layer]);
        }
        this.scene.physics.add.collider(this.entity, this.scene.levelManager.panels);
        this.scene.physics.add.collider(this.entity, this.scene.goblin);
    }

    setAnimationWizard() {
        let idleFrameNames = this.scene.anims.generateFrameNames('wizard', {
            prefix: '1_IDLE_',
            suffix: '.png',
            start: 0,
            end: 4,
            zeroPad: 3
        });
        let attackFrameNames = this.scene.anims.generateFrameNames('wizard', {
            prefix: '5_ATTACK_',
            suffix: '.png',
            start: 0,
            end: 4,
            zeroPad: 3
        });
        let runFrameNames = this.scene.anims.generateFrameNames('wizard', {
            prefix: '3_RUN_',
            suffix: '.png',
            start: 0,
            end: 4,
            zeroPad: 3
        });
        this.scene.anims.create({
            key: 'wizard-idle',
            frames: idleFrameNames,
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'wizard-attack',
            frames: attackFrameNames,
            duration: 500,
            frameRate: 7,
            repeat: 1
        });
        this.scene.anims.create({
            key: 'wizard-run',
            frames: runFrameNames,
            frameRate: 25,
            repeat: -1
        })
    }

    heal(health) {
        this.health += health;
        this.health = this.health > 100 ? 100 : this.health;
    }

    power(mana) {
        this.mana += mana;
        this.mana = this.mana > 100 ? 100 : this.mana;
    }

    update() {
        this._listenInputsMovement();
        this._updatePhysics();

    }

    _listenInputsMovement() {
        if (this.scene.keys.left.isDown) {
            this.currentState = Wizard.STATE.walking;
            this.direction = Wizard.DIRECTION.left;
        } else if (this.scene.keys.right.isDown) {
            this.currentState = Wizard.STATE.walking;
            this.direction = Wizard.DIRECTION.right;
        } else {
            this.currentState = Wizard.STATE.idle;
            this.direction = Wizard.DIRECTION.none;
        }
        if (this.isAttacking && this.ISLASTATTACKOUTDATED) {
            this.isAttacking = false;
        }
        if (this.scene.keys.jump.isDown && this.entity.body.onFloor()) {
            this.currentState = Wizard.STATE.jumping;
        }
    }

    _listenInputsSpellsDev() {
        this.scene.input.keyboard.on('keydown_ONE', function (event) {
            this.scene.processors.spell.spells.fly.execute();
        }.bind(this));
        this.scene.input.keyboard.on('keydown_TWO', function (event) {
            if (!this.ISLASTATTACKOUTDATED) {
                return;
            }
            this.lastAttackTime = Date.now();
            this.isAttacking = true;
            setTimeout(function () {
                this.scene.processors.spell.spells.fireball.execute();
            }.bind(this), 600);
        }.bind(this));
        this.scene.input.keyboard.on('keydown_THREE', function (event) {
            this.scene.processors.spell.spells.break.execute();
        }.bind(this));
    }

    _updatePhysics() {
        if (this.ISWALKING) {
            this.entity.body.setVelocityX(this.xVelocity * this.direction);
            if (!this.ISATTACKING) {
                this.texture.anims.play('wizard-run', true);
            }
        } else {
            this.entity.body.setVelocityX(0);
        }
        if (this.ISJUMPING) {
            this.entity.body.setVelocityY(-550)
        }
        if (this.ISATTACKING) {
            this.texture.anims.play('wizard-attack', true);
        }
        if (this.ISIDLE) {
            this.texture.anims.play('wizard-idle', true);
        }
        // console.log(this.currentState);
    }

    hit(damage) {
        this.health -= damage;
        this.currentState = Wizard.STATE.hit;
        this.entity.body.setVelocityX(this.xVelocity * this.direction * -2.5);
    }

    static get STATE() {
        return {
            idle: 0,
            walking: 1,
            jumping: 2,
            falling: 3,
            hit: 4,
            attacking: 5
        }
    }

    static get DIRECTION() {
        return {
            left: -1,
            none: 0,
            right: 1
        }
    }

    get ISLASTATTACKOUTDATED() {
        return this.lastAttackTime + this.attackDelay < Date.now();
    }

    get ISATTACKING() {
        return this.isAttacking === true;
    }

    get ISWALKING() {
        return this.currentState === Wizard.STATE.walking;
    }

    get ISIDLE() {
        return this.currentState === Wizard.STATE.idle && this.isAttacking === false;
    }

    get ISJUMPING() {
        return this.currentState === Wizard.STATE.jumping;
    }

    get ISFALLING() {
        return this.currentState === Wizard.STATE.falling;
    }

    get ISHIT() {
        return this.currentState === Wizard.STATE.hit;
    }

    get ISRIGHT() {
        return this.direction === Wizard.DIRECTION.right;
    }

    get ISLEFT() {
        return !this.ISRIGHT;
    }

    get ISWALKINGRIGHT() {
        return this.ISWALKING && this.ISRIGHT;
    }

    get ISWALKINGLEFT() {
        return this.ISWALKING && this.ISLEFT;
    }
}
export default class Wizard {
    constructor(scene) {
        this.scene = scene;
        this.entity = null;
        this.texture = null;
        this.xVelocity = 300;
        this.health = 100;
        this.mana = 100;
        this.spawn = {
            x: 310,
            y: 3150
        }
        this.currentState = Wizard.STATE.idle;
        this.direction = Wizard.DIRECTION.right;
        this.spellState = {
            fly: false,
            fire: false,
            break: false
        }
        this.spell = null;
    }

    create() {
        this.entity = this.scene.add.container(this.spawn.x, this.spawn.y);
        this.texture = this.scene.add.sprite(5, -10, 'texture');
        this.entity.add(this.texture);
        this.entity.setSize(35, 55);
        this.scene.physics.world.enable(this.entity);
        this.scene.physics.add.collider(this.entity, this.scene.physics.world);
        this.entity.body.setCollideWorldBounds(true);
        this.setAnimationWizard();
        this.setAnimationSpell();
        this._listenInputsSpellsDev();

    }

    setAnimationWizard() {
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

    setAnimationSpell() {
        this.scene.anims.create({
            key: 'wizard-fly',
            frames: this.scene.anims.generateFrameNumbers('spell-fly', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
    }

    // Update function call in Scene update loop
    update() {
        this._listenInputsMovement();
        this._listenSpellState();
        this._updatePhysics();
        this._updateGraphics();
        this._updateSpell();
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
        }
        if (this.scene.keys.jump.isDown && this.entity.body.onFloor()) {
            this.currentState = Wizard.STATE.jumping;
        }
    }

    _listenInputsSpellsDev() {
        this.scene.input.keyboard.on('keydown_ONE', function (event) {
            this.spellState.fly = true;
        }.bind(this));
        this.scene.input.keyboard.on('keydown_TWO', function (event) {
            this.spellState.fire = true;
        }.bind(this));
        this.scene.input.keyboard.on('keydown_THREE', function (event) {
            this.spellState.break = true;
        }.bind(this));
    }

    _updatePhysics() {
        if (this.ISWALKINGLEFT) {
            this.entity.body.setVelocityX(this.xVelocity * -1);
        }
        if (this.ISWALKINGRIGHT) {
            this.entity.body.setVelocityX(this.xVelocity);
        }
        if (this.ISJUMPING) {
            this.entity.body.setVelocityY(-550)
        }
        if (this.ISFLYING) {
            this.entity.body.setVelocityY(-1050);
        }
        if (this.ISIDLE) {
            this.entity.body.setVelocityX(0);
            this.texture.anims.play('wizard-idle', true);
        }
    }

    _updateGraphics() {
    }

    _listenSpellState() {
        if (this.spellState.fly && this.entity.body.onFloor()) {
            this.spellState.fly = false;
            this.fly();
        }
        if (this.spellState.break) {
            console.log('Break, tremblement de terre')
            this.break();
            this.spellState.break = false;
        }
    }

    fly() {
        this.currentState = Wizard.STATE.flying;
        this.createSpell('spell-fly', 'wizard-fly', 50);
    }

    break() {
        this.currentState = Wizard.STATE.breaking;
        this.createSpell('spell-fly', 'wizard-fly', 50);
    }

    createSpell(spriteName, animName, duration) {
        this.spell = {
            sprite: this.scene.add.sprite(0, 0, spriteName),
            duration: duration
        };
        this.entity.add(this.spell.sprite);
        this.spell.sprite.anims.play(animName);
    }

    _updateSpell() {
        if (this.spell) {
            this.spell.duration--;
            if (this.spell.duration <= 0) {
                this.spell.sprite.destroy();
                this.spell = null;
            }
        }
    }

    static get STATE() {
        return {
            idle: 0,
            walking: 1,
            jumping: 2,
            falling: 3,
            flying: 4,
            breaking: 5
        }
    }

    static get DIRECTION() {
        return {
            left: -1,
            right: 1
        }
    }

    get ISWALKING() {
        return this.currentState === Wizard.STATE.walking;
    }

    get ISIDLE() {
        return this.currentState === Wizard.STATE.idle;
    }

    get ISJUMPING() {
        return this.currentState === Wizard.STATE.jumping;
    }

    get ISFALLING() {
        return this.currentState === Wizard.STATE.falling;
    }

    get ISFLYING() {
        return this.currentState === Wizard.STATE.flying;
    }

    get ISBREAKING() {
        return this.currentState === Wizard.STATE.breaking;
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
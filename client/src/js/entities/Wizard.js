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
        // console.log(this.entity.body);
        this._listenInputsMovement();
        this._updatePhysics();
        this._updateGraphics();
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
            this.scene.processors.spell.spells.fly.execute();
        }.bind(this));
        this.scene.input.keyboard.on('keydown_TWO', function (event) {
            this.scene.processors.spell.spells.fireball.execute();
        }.bind(this));
        this.scene.input.keyboard.on('keydown_THREE', function (event) {
            this.scene.processors.spell.spells.break.execute();
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
        if (this.ISIDLE) {
            this.entity.body.setVelocityX(0);
            this.texture.anims.play('wizard-idle', true);
        }
    }

    _updateGraphics() {
    }

    static get STATE() {
        return {
            idle: 0,
            walking: 1,
            jumping: 2,
            falling: 3
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
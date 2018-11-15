export default class Wizard {
    constructor(scene) {
        this.scene = scene;
        this.entity = null;
        this.texture = null;
        this.xVelocity = 300;
        this.health = 100;
        this.mana = 100;
        this.spawn = {
            x: 110,
            y: 400
        }
        this.currentState = Wizard.STATE.idle;
        this.direction = Wizard.DIRECTION.right;
    }

    create() {
        this.entity = this.scene.add.container(this.spawn.x, this.spawn.y);
        this.texture = this.scene.add.sprite(5, -10, 'texture');
        this.entity.add(this.texture);
        this.entity.setSize(35, 55);
        this.scene.physics.world.enable(this.entity);
        this.scene.physics.add.collider(this.entity, this.scene.physics.world);
        this.entity.body.setCollideWorldBounds(true);
        this.setAnimation();

    }

    setAnimation() {
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
        this._listenInputs();
        this._updatePhysics();
        this._updateGraphics();
    }

    _listenInputs() {
        if (this.scene.cursors.left.isDown) {
            this.currentState = Wizard.STATE.walking;
            this.direction = Wizard.DIRECTION.left;
        } else if (this.scene.cursors.right.isDown) {
            this.currentState = Wizard.STATE.walking;
            this.direction = Wizard.DIRECTION.right;
        } else {
            this.currentState = Wizard.STATE.idle;
        }
    }

    _updatePhysics() {
        if (this.ISWALKINGLEFT) {
            this.entity.body.setVelocityX(this.xVelocity * -1);
        }
        if (this.ISWALKINGRIGHT) {
            this.entity.body.setVelocityX(this.xVelocity);
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
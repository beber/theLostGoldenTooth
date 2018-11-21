export default class Goblin extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'goblin');
        this.scene = config.scene;
        this.xVelocity = Phaser.Math.RND.between(280, 300);
        this.yVelocity = -520;
        this.health = 50;
        this.delayReflexion = Phaser.Math.RND.between(500, 800);
        this.lastDirectionReflexion = Date.now();
        this.spawn = {
            x: 410,
            y: 3150
        }
        this.currentState = Goblin.STATE.idle;
        this.direction = Goblin.DIRECTION.right;
        this.feelState = false;
        this.feelMinDistance = 700;
        this.create();
    }

    setSpawn(x, y) {
        this.spawn.x = x;
        this.spawn.y = y;
    }

    create() {
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setSize(this.width * .5, this.height * .65);
        this.body.setOffset(this.displayOriginX / 2, this.displayOriginY / 2 - 20);
        // this._setAnimations();
        this._setCollisions();
    }

    _setCollisions() {
        for (let layer in this.scene.levelManager.physicsLayer) {
            this.scene.physics.add.collider(this, this.scene.levelManager.physicsLayer[layer]);
        }
        this.scene.physics.add.overlap(this, this.scene.wizard.entity, function (goblin, wizard) {
            // console.log('overlap')
        })
    }

    update() {
        if (undefined === this.body || null === this.body) {
            return;
        }

        this._canFeel();
        if (this.ISFEELINGWIZARD) {
            if (this._canThinkDirection()) {
                this._setDirection();
            }
            this.body.setVelocityX(this.xVelocity * this.direction, 0);
        }
        if (this.ISIDLE) {
            this.body.setVelocityX(0);
            this.anims.play('goblin-idle', true);
        }
        if (this.body.blocked.left || this.body.blocked.right) {
            this._jump();
        }
    }

    _canThinkDirection() {
        if (this.lastDirectionReflexion + this.delayReflexion < Date.now()) {
            this.delayReflexion = Phaser.Math.RND.between(500, 800);
            this.lastDirectionReflexion = Date.now();
            return true;
        }
        return false;
    }

    _canFeel() {
        let distanceFromWizard = Phaser.Math.Distance.Between(this.body.x, this.body.y, this.scene.wizard.entity.body.x, this.scene.wizard.entity.body.y);
        if (distanceFromWizard <= this.feelMinDistance) {
            this.feelState = true;
            this.currentState = Goblin.STATE.walking;
        } else {
            this.currentState = Goblin.STATE.iddle;
            this.feelState = false;
        }
    }

    _setDirection() {
        let vector = new Phaser.Math.Vector2(this.scene.wizard.entity.body).subtract(this.body);
        if (vector.x < 0) {
            this.direction = Goblin.DIRECTION.left;
        } else {
            this.direction = Goblin.DIRECTION.right;
        }
    }

    _jump() {
        if (this.body.onFloor()) {
            // console.log('JUMP')
            this.currentState = Goblin.STATE.jumping;
            this.body.setVelocityY(this.yVelocity);
        }
    }

    static get STATE() {
        return {
            idle: 0,
            walking: 1,
            jumping: 2,
        }
    }

    static get DIRECTION() {
        return {
            left: -1,
            right: 1
        }
    }

    get ISWALKING() {
        return this.currentState === Goblin.STATE.walking;
    }

    get ISIDLE() {
        return this.currentState === Goblin.STATE.idle;
    }

    get ISFEELINGWIZARD() {
        return this.feelState === true;
    }
}
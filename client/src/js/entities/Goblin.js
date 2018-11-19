export default class Goblin {
    constructor(scene) {
        this.scene = scene;
        this.entity = null;
        this.texture = null;
        this.xVelocity = Phaser.Math.RND.between(300, 330);
        this.yVelocity = -520;
        this.health = 50;
        this.delayReflexion = Phaser.Math.RND.between(700, 1200);
        this.lastDirectionReflexion = Date.now();
        this.spawn = {
            x: 410,
            y: 3150
        }
        this.currentState = Goblin.STATE.idle;
        this.direction = Goblin.DIRECTION.right;
        this.feelState = false;
        this.feelMinDistance = 700;
    }

    setSpawn(x, y) {
        this.spawn.x = x;
        this.spawn.y = y;
    }

    create() {
        this.entity = this.scene.add.sprite(this.spawn.x, this.spawn.y, 'goblin');
        this.scene.physics.world.enable(this.entity);
        this.entity.body.setSize(this.entity.width * .5, this.entity.height * .65);
        this.entity.body.setOffset(this.entity.displayOriginX / 2, this.entity.displayOriginY / 2 - 20);
        this._setAnimations();
        this._setCollisions();
    }

    _setCollisions() {
        for (let layer in this.scene.levelManager.physicsLayer) {
            this.scene.physics.add.collider(this.entity, this.scene.levelManager.physicsLayer[layer]);
        }

    }

    _setAnimations() {
        let idleFrameNames = this.scene.anims.generateFrameNames('goblin', {
            prefix: '2D_GOBLIN__Idle_',
            suffix: '.png',
            end: 7,
            zeroPad: 3
        });
        this.scene.anims.create({
            key: 'goblin-idle',
            frames: idleFrameNames,
            frameRate: 10,
            repeat: -1
        })
    }

    update() {
        this._canFeel();
        if (this.ISFEELINGWIZARD) {
            if (this._canThinkDirection()) {
                this._setDirection();
            }
            this.entity.body.setVelocityX(this.xVelocity * this.direction);
        }
        if (this.ISIDLE) {
            this.entity.body.setVelocityX(0);
            this.entity.anims.play('goblin-idle', true);
        }
        if (this.entity.body.blocked.left || this.entity.body.blocked.right) {
            this._jump();
        }
    }

    _canThinkDirection() {
        if (this.lastDirectionReflexion + this.delayReflexion < Date.now()) {
            this.delayReflexion = Phaser.Math.RND.between(700, 1200);
            this.lastDirectionReflexion = Date.now();
            return true;
        }
        return false;
    }

    _canFeel() {
        let distanceFromWizard = Phaser.Math.Distance.Between(this.entity.body.x, this.entity.body.y, this.scene.wizard.entity.body.x, this.scene.wizard.entity.body.y);
        if (distanceFromWizard <= this.feelMinDistance) {
            this.feelState = true;
            this.currentState = Goblin.STATE.walking;
        } else {
            this.currentState = Goblin.STATE.iddle;
            this.feelState = false;
        }
    }

    _setDirection() {
        let vector = new Phaser.Math.Vector2(this.scene.wizard.entity.body).subtract(this.entity.body);
        if (vector.x < 0) {
            this.direction = Goblin.DIRECTION.left;
        } else {
            this.direction = Goblin.DIRECTION.right;
        }
    }

    _jump() {
        if (this.entity.body.onFloor()) {
            this.currentState = Goblin.STATE.jumping;
            this.entity.body.setVelocityY(this.yVelocity);
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
export default class Goblin {
    constructor(scene) {
        this.scene = scene;
        this.entity = null;
        this.texture = null;
        this.xVelocity = 350;
        this.health = 50;
        this.spawn = {
            x: 410,
            y: 3150
        }
        this.currentState = Goblin.STATE.idle;
        this.direction = Goblin.DIRECTION.right;
    }

    create() {
        this.entity = this.scene.add.sprite(400, 3000, 'goblin');
        this.scene.physics.world.enable(this.entity);
        this.entity.body.setSize(this.entity.width * .5, this.entity.height * .65);
        this.entity.body.setOffset(this.entity.displayOriginX / 2, this.entity.displayOriginY / 2 - 20);
        this._setAnimations();
        this._setCollisions();
    }

    setSpawn(x, y) {
        this.spawn.x = x;
        this.spawn.y = y;
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
        if (this.ISIDLE) {
            this.entity.body.setVelocityX(0);
            this.entity.anims.play('goblin-idle', true);
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
}
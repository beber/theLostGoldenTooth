export default class Goblin extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'goblin');
        this.scene = config.scene;
        this.scene.add.existing(this);
        this.className = 'goblin';
        this.xVelocity = Phaser.Math.RND.between(280, 300);
        this.yVelocity = -620;
        this.health = 50;
        this.damage = 2;
        this.lastAttack = Date.now();
        this.lastAttackDelay = 1000;
        this.delayReflexion = Phaser.Math.RND.between(500, 800);
        this.lastDirectionReflexion = Date.now();
        this.currentState = Goblin.STATE.idle;
        this.direction = Goblin.DIRECTION.right;
        this.feelState = false;
        this.feelMinDistance = 700;
        this.attackMinDistance = 150;
        this.nextToWizard = false;
        this.create();
    }

    create() {
        this.scene.physics.world.enable(this);
        this.body.setSize(this.width * .5, this.height * .65);
        this.body.setOffset(this.displayOriginX / 2, this.displayOriginY / 2 - 20);
        this._setCollisions();
        this.on('destroy', () => {
            this.scene.itemManager.dropItem(this);
        });
    }

    _setCollisions() {
        for (let layer in this.scene.levelManager.physicsLayer) {
            this.scene.physics.add.collider(this, this.scene.levelManager.physicsLayer[layer]);
        }
        this.scene.physics.add.collider(this, this.scene.levelManager.panels);
    }

    hit(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.destroy();
        }
    }

    update() {
        if (undefined === this.body || null === this.body) {
            return;
        }
        this._canFeel();
        this._nextToWizard();
        if (this.ISFEELINGWIZARD && this._canThinkDirection()) {
            this._setDirection();
        }
        if (this.ISATTACKING) {
            // console.log('ATTACK')
            this.body.setVelocityX(0);
            this.anims.play('goblin-attack', true);
            if (this.lastAttack + this.lastAttackDelay < Date.now()) {
                this.scene.wizard.hit(this.damage);
                this.lastAttack = Date.now();
            }
        }
        if (this.ISWALKING) {
            this.anims.play('goblin-run', true);
            this.body.setVelocityX(this.xVelocity * this.direction, 0);
        }
        if (this.ISIDLE) {
            this.body.setVelocityX(0);
            this.anims.play('goblin-idle', true);
        }
        if (this.body.blocked.left || this.body.blocked.right) {
            this._jump();
        }
        // console.log(this.currentState)
        this.nextToWizard = false;
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
            this.currentState = Goblin.STATE.idle;
            this.feelState = false;
        }
    }

    _nextToWizard() {
        let distanceFromWizard = Phaser.Math.Distance.Between(this.body.x, this.body.y, this.scene.wizard.entity.body.x, this.scene.wizard.entity.body.y);
        if (distanceFromWizard <= this.attackMinDistance) {
            this.nextToWizard = true;
            this.currentState = Goblin.STATE.attacking;
        } else {
            this.nextToWizard = false;
        }
    }

    _setDirection() {
        let vector = new Phaser.Math.Vector2(this.scene.wizard.entity.body).subtract(this.body);
        if (vector.x < 0) {
            this.direction = Goblin.DIRECTION.left;
            this.flipX = false;
        } else {
            this.direction = Goblin.DIRECTION.right;
            this.flipX = true;
        }
    }

    _jump() {
        if (this.body.onFloor()) {
            this.currentState = Goblin.STATE.jumping;
            this.body.setVelocityY(this.yVelocity);
        }
    }

    static get STATE() {
        return {
            idle: 0,
            walking: 1,
            jumping: 2,
            attacking: 3,
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

    get ISATTACKING() {
        return this.currentState === Goblin.STATE.attacking && this.ISNEXTTOWIZARD;
    }

    get ISIDLE() {
        return this.currentState === Goblin.STATE.idle;
    }

    get ISFEELINGWIZARD() {
        return this.feelState === true;
    }

    get ISNEXTTOWIZARD() {
        return this.nextToWizard === true;
    }
}
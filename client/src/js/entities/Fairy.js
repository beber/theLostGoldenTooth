export default class Fairy {
    constructor(scene) {
        this.scene = scene;
        this.entity = null;
        this.health = 100;
        this.mana = 100;
        this.currentElement = 'wind';
        this.spawn = {
            x: 0,
            y: 0
        }
        this.spawnOffset = {
            x: 50,
            y: 30
        }
        this.wizardCoords = {
            x: 0,
            y: 0
        }
        this.following = false;
    }

    create() {
        this.entity = this.scene.add.sprite(this.spawn.x, this.spawn.y, 'fairy');
        this.setAnimation();
        this.entity.play('fairy-left')
        this.wizardCoords.x = this.scene.wizard.entity.x;
        this.wizardCoords.y = this.scene.wizard.entity.y;

    }

    update() {
        this._updateWizardCoords();
        this._followWizard();
        this._updateGraphics();
    }

    setSpawn(spawn) {
        this.spawn.x = spawn.x - this.spawnOffset.x;
        this.spawn.y = spawn.y - this.spawnOffset.y;
    }

    setAnimation() {
        this.scene.anims.create({
            key: 'fairy-left',
            frames: this.scene.anims.generateFrameNumbers('fairy', {start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'fairy-right',
            frames: this.scene.anims.generateFrameNumbers('fairy', {start: 6, end: 8}),
            frameRate: 10,
            repeat: -1
        });
    }

    _updateWizardCoords() {
        if (this.wizardCoords.x !== this.scene.wizard.entity.x - this.spawnOffset.x || this.wizardCoords.y !== this.scene.wizard.entity.y - this.spawnOffset.y) {
            this.wizardCoords.x = this.scene.wizard.entity.x - this.spawnOffset.x;
            this.wizardCoords.y = this.scene.wizard.entity.y - this.spawnOffset.y;
        }
    }

    _followWizard() {
        if (!this.following && (this.entity.x !== this.wizardCoords.x || this.entity.y !== this.wizardCoords.y)) {
            this.scene.tweens.add({
                targets: this.entity,
                props: {
                    x: {
                        value: this.wizardCoords.x,
                        duration: 700
                    },
                    y: {
                        value: this.wizardCoords.y,
                        duration: 700
                    }
                },
                ease: 'Linear',
                onStart: () => {
                    this.following = true;
                },
                onComplete: () => {
                    this.following = false;
                }
            })
        }
    }

    _updateGraphics() {
    }

    static
    get STATE() {
        return {
            idle: 0,
            flying: 1,
            attacking: 2
        }
    }

    static
    get DIRECTION() {
        return {
            left: -1,
            right: 1
        }
    }

    get ISIDLE() {
        return this.currentState === Fairy.STATE.idle;
    }

    get ISFLYING() {
        return this.currentState === Fairy.STATE.flying;
    }

    get ISRIGHT() {
        return this.direction === Fairy.DIRECTION.right;
    }

    get ISLEFT() {
        return !this.ISRIGHT;
    }
}
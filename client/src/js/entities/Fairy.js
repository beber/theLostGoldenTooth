export default class Fairy {
    constructor(scene) {
        this.scene = scene;
        this.entity = null;
        this.health = 100;
        this.mana = 100;
        this.currentElement = 'earth';
        this.spawn = {
            x: 0,
            y: 0
        };
        this.spawnOffset = {
            x: 50,
            y: 30
        };
        this.wizardCoords = {
            x: 0,
            y: 0
        };
        this.following = false;
    }

    create() {
        this.entity = this.scene.add.sprite(this.spawn.x, this.spawn.y, 'fairy');
        this.entity.play('fairy-idle-' + this.currentElement);
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
                        duration: 50
                    },
                    y: {
                        value: this.wizardCoords.y,
                        duration: 50
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
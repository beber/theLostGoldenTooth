export default class Fairy {
    constructor(scene) {
        this.scene = scene;
        this.entity = null;
        this.health = 100;
        this.mana = 100;
        this.spawn = {
            x: 0,
            y: 0
        }
        this.spawnOffset = {
            x: 50,
            y: 30
        }
    }

    create() {
        this.entity = this.scene.add.sprite(this.spawn.x, this.spawn.y, 'fairy');
        this.setAnimation();
        this.entity.play('fairy-left')
    }

    update() {

    }

    setSpawn(spawn) {
        this.spawn.x = spawn.x - this.spawnOffset.x;
        this.spawn.y = spawn.y - this.spawnOffset.y;
    }

    setAnimation() {
        this.scene.anims.create({
            key: 'fairy-left',
            frames: this.scene.anims.generateFrameNumbers('fairy', {start: 0, end: 2}),
            frameRate: 15,
            repeat: -1
        });

    }
}
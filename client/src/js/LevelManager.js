export default class LevelManager {
    constructor(scene) {
        this.scene = scene;
        this.level = null;
        this._levelNumber = 1;
        this.map = null;
        this.tileset = null;
    }

    setLevel(number) {
        this._levelNumber = number;
    }

    loadLevel() {
        this.map = this.scene.add.tilemap('level' + this._levelNumber);
        this.tileset = this.map.addTilesetImage('tiles_spritesheet', 'tiles', 70, 70, 0, 2);
        // this.yOffset = (this.map.tileHeight * this.map.height) * -1 + this.scene.game.config.height;
        this.yOffset = 0;
        this.createBackground();
        this.createFloor();
        this.createPlatform();
        this.createkeyHolders();
        this.createDoor();
    }

    createBackground() {
        this.bgFloor = this.map.createStaticLayer('BackgroundFloor', this.tileset, 0, this.yOffset);
        this.bgDecoration = this.map.createStaticLayer('BackgroundDecoration', this.tileset, 0, this.yOffset);
    }

    createFloor() {
        this.floor = this.map.createStaticLayer('Floor', this.tileset, 0, this.yOffset);
        this.floor.setOrigin(0)
        this.floor.setCollisionByExclusion([-1, 0], true);
        this.scene.physics.add.collider(this.scene.wizard.entity, this.floor);
    }

    createPlatform() {
        this.platform = this.map.createStaticLayer('Platform', this.tileset, 0, this.yOffset);
        this.platformHalf = this.map.createStaticLayer('PlatformHalf', this.tileset, 0, this.yOffset);
    }

    createkeyHolders() {
        this.keyHolders = this.map.createStaticLayer('KeyHolders', this.tileset, 0, this.yOffset);
    }

    createDoor() {
        this.door = this.map.createStaticLayer('Door', this.tileset, 0, this.yOffset);
    }
}
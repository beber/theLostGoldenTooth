export default class LevelManager {
    constructor(scene) {
        this.scene = scene;
        this.level = null;
        // this._levelNumber = 1;
        this._levelNumber = 'test';
        this.map = null;
        this.tileset = null;
        this.physicsLayer = [];
        this.panels = this.scene.physics.add.staticGroup({immovable: true});
        this.map = this.scene.add.tilemap('level' + this._levelNumber);
        // this.tileset = this.map.addTilesetImage('tiles_spritesheet', 'tiles', 70, 70, 0, 2);
        this.tileset = this.map.addTilesetImage('test', 'tilestest', 70, 70, 1, 2);
    }

    setLevel(number) {
        this._levelNumber = number;
    }

    loadLevel() {
        this.yOffset = 0;
        this.createBackground();
        this.createFloor();
        // this.createPlatform();
        // this.createkeyHolders();
        // this.createDoor();
        // this.createBreakablePanel();
    }

    createBackground() {
        this.bgFloor = this.map.createStaticLayer('BackgroundFloor', this.tileset, 0, this.yOffset);
        this.bgDecoration = this.map.createStaticLayer('BackgroundDecoration', this.tileset, 0, this.yOffset);
    }

    createFloor() {
        let floor = this.map.createStaticLayer('Floor', this.tileset, 0, this.yOffset);
        floor.setOrigin(0);
        floor.setCollisionByExclusion([-1, 0], true);
        this.physicsLayer.push(floor)
    }

    createPlatform() {
        let platform = this.map.createStaticLayer('Platform', this.tileset, 0, this.yOffset);
        platform.setCollisionByExclusion([-1, 0], true);
        let platformHalf = this.map.createStaticLayer('PlatformHalf', this.tileset, 0, this.yOffset);
        platformHalf.setCollisionByExclusion([-1, 0], true);
        this.physicsLayer.push(platform);
        this.physicsLayer.push(platformHalf);
    }

    createkeyHolders() {
        this.keyHolders = this.map.createStaticLayer('KeyHolders', this.tileset, 0, this.yOffset);
    }

    createDoor() {
        this.door = this.map.createStaticLayer('Door', this.tileset, 0, this.yOffset);
    }

    createBreakablePanel() {
        let breakablePanelLayer = this.map.getObjectLayer('BreakablePanel');
        breakablePanelLayer.objects.forEach((object) => {
            let panel = this.panels.create(object.x + object.width / 2, object.y + object.height / 2, 'panel');
        });
    }

    getWizardSpawn() {
        let spawnLayer = this.map.getObjectLayer('WizardSpawn');
        return {
            x: spawnLayer.objects[0].x,
            y: spawnLayer.objects[0].y
        }
    }

    getGoblinsSpawns() {
        return this.map.getObjectLayer('EnnemiSpawn').objects;
    }
}
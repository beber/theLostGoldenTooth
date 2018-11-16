import Phaser from 'phaser'
import Wizard from '../entities/Wizard';
import Fairy from '../entities/Fairy';
import LevelManager from "../LevelManager";

export default class extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene', backgroundColor: '#2d2d2d'});
        this.wizard = null;
        this.fairy = null;
        this.cursors = null;
    }

    preload() {
        this.wizard = new Wizard(this);
        this.fairy = new Fairy(this);
        this.levelManager = new LevelManager(this);
        this.levelManager.setLevel(1);
    }

    create() {
        //Set controls
        this.setControls();
        // Create characters, map and others things
        this.wizard.create();
        this.fairy.setSpawn(this.wizard.spawn);
        this.fairy.create();
        this.levelManager.loadLevel();
        this.physics.world.setBounds(0, 0, this.levelManager.map.tileWidth * this.levelManager.map.width, this.levelManager.map.tileHeight * this.levelManager.map.height)
        this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);
        this.cameras.main.startFollow(this.wizard.entity, true, 0.05, 0.05);

    }

    update() {
        // Update characters, map and others things
        this.wizard.update();
        this.fairy.update();
    }

    setControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
}
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


    }

    update() {
// Update characters, map and others things
        this.wizard.update();
    }

    setControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
}
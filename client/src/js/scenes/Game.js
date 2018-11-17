import Phaser from 'phaser'
import Wizard from '../entities/Wizard';
import Fairy from '../entities/Fairy';
import Goblin from '../entities/Goblin';
import LevelManager from "../LevelManager";

export default class extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene', backgroundColor: '#2d2d2d'});
        this.wizard = null;
        this.fairy = null;
        this.keys = null;
    }

    preload() {
        this.wizard = new Wizard(this);
        this.fairy = new Fairy(this);
        this.goblin = new Goblin(this);
        this.levelManager = new LevelManager(this);
        this.levelManager.setLevel(1);
    }

    create() {
        //Set controls
        this.setControls();

        this.physics.world.setBounds(0, 0, this.levelManager.map.tileWidth * this.levelManager.map.width, this.levelManager.map.tileHeight * this.levelManager.map.height)
        this.levelManager.loadLevel();

        this.goblin.create();

        this.wizard.setSpawn(this.levelManager.getWizardSpawn().x, this.levelManager.getWizardSpawn().y)
        this.wizard.create();

        this.fairy.setSpawn(this.wizard.spawn);
        this.fairy.create();

        this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);
        this.cameras.main.startFollow(this.wizard.entity, true, 0.05, 0.05);
    }

    update() {
        // Update characters, map and others things
        this.goblin.update();
        this.wizard.update();
        this.fairy.update();
    }

    setControls() {
        // Ask player if he want to play with cursor or ZQSD ?
        // this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {
            jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            fly: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
            fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
        };
    }
}
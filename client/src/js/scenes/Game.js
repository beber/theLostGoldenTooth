import Phaser from 'phaser'
import Wizard from '../entities/Wizard';
import Fairy from '../entities/Fairy';
import Goblin from '../entities/Goblin';
import Boss from "../entities/Boss";

import LevelManager from "../LevelManager";

import spells from '../spells/spells';
import SpellProcessor from "../processors/SpellProcessor";
import ElementProcessor from "../processors/ElementProcessor";

import Socket from '../Socket'
import HUDController from "../HUDController";

import items from '../items/items';
import ItemManager from "../ItemManager";

export default class extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene', backgroundColor: '#2d2d2d'});
        this.wizard = null;
        this.fairy = null;
        this.cursors = null;
        this.keys = null;
        this.boss = null;
        this.goblins = null;
        this.sky = null;
        this.clouds = null;
        this.sync = false;
        this.cloudsCoord = [{x: 350, y: 1600}, {x: 200, y: 400}, {x: 800, y: 500}, {x: 1200, y: 150}, {
            x: 2000,
            y: 1700
        }];

        this.hudController = new HUDController(this);
        this.processors = {
            'element': new ElementProcessor(this),
            'spell': new SpellProcessor(this, spells.spells)
        };

        this.socket = new Socket(playerInformation);

        this.socket.on('message', (data) => {
            this.processMessage(data);
        });

        this.socket.on('sync', (data) => {
            this.scene.resume();
            this.sync = true;
        });

        this.socket.on('leave', (data) => {
            this.scene.pause();
            this.sync = false;
        });
    }

    preload() {
        this.wizard = new Wizard(this);
        this.fairy = new Fairy(this);
        this.goblins = this.physics.add.group();
        this.levelManager = new LevelManager(this);
        this.itemManager = new ItemManager(this, items.items);
        this.levelManager.setLevel(1);

        for (let i in this.processors) {
            this.processors[i].preload();
        }
        this.clouds = this.add.group();
        this.setAnimations();
    }

    create() {
        //Set controls
        this.setControls();
        // this.cameras.main.transparent = false;
        // this.cameras.main.setBackgroundColor('rgba(255, 0, 0, 0.5)');
        this.physics.world.setBounds(0, 0, this.levelManager.map.tileWidth * this.levelManager.map.width, this.levelManager.map.tileHeight * this.levelManager.map.height)
        this.sky = this.add.sprite(0, 200, 'sky');
        this.sky.setScrollFactor(0);
        for (let i = 0; i < this.cloudsCoord.length; i++) {
            this.clouds.create(this.cloudsCoord[i].x, this.cloudsCoord[i].y, 'cloud').setScrollFactor(.2);
        }

        this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);

        this.levelManager.loadLevel();
        this.wizard.setSpawn(this.levelManager.getWizardSpawn().x, this.levelManager.getWizardSpawn().y);
        this.wizard.create();

        this.fairy.setSpawn(this.wizard.spawn);
        this.fairy.create();

        this.createGoblins();
        this.cameras.main.startFollow(this.wizard.entity, false, 0.05, 0.05);

        this.hudController.load();

        if (!this.sync) {
            this.scene.pause();
        }
    }

    update() {
        for (let i in this.processors) {
            this.processors[i].update();
        }

        // Update characters, map and others things
        this.wizard.update();
        this.fairy.update();

        for (let i = 0; i < this.goblins.getChildren().length; i++) {
            this.goblins.getChildren()[i].update()
        }

        if (this.boss !== null && this.boss !== undefined) {
            this.boss.update();
        }
    }

    setControls() {
        // Ask player if he want to play with cursor or ZQSD ?
        // this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {
            jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
    }

    createGoblins() {
        let spawns = this.levelManager.getGoblinsSpawns();
        spawns.forEach(spawn => {
            // Create goblins by reading number value in json map
            for (let i = 0; i < spawn.properties[0].value; i++) {
                let randX = Phaser.Math.RND.between(Math.round(spawn.x), Math.round(spawn.x + spawn.width));
                let y = Math.round(spawn.y) - 100;
                let goblin = new Goblin({scene: this, x: randX, y: y});
                this.goblins.add(goblin);
            }
        })
    }

    setAnimations() {
        let goblinIdleFrameNames = this.anims.generateFrameNames('goblin', {
            prefix: '2D_GOBLIN__Idle_',
            suffix: '.png',
            start: 0,
            end: 7,
            zeroPad: 3
        });
        let goblinRunningFrameNames = this.anims.generateFrameNames('goblin', {
            prefix: '2D_GOBLIN__Run_',
            suffix: '.png',
            start: 0,
            end: 7,
            zeroPad: 3
        });
        let goblinAttackFrameNames = this.anims.generateFrameNames('goblin', {
            prefix: '2D_GOBLIN__Attack_',
            suffix: '.png',
            start: 0,
            end: 7,
            zeroPad: 3
        });
        this.anims.create({
            key: 'goblin-idle',
            frames: goblinIdleFrameNames,
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'goblin-run',
            frames: goblinRunningFrameNames,
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'goblin-attack',
            frames: goblinAttackFrameNames,
            frameRate: 10,
            repeat: -1
        })
    }

    processMessage(data) {
        if (undefined === data.type) {
            console.error('message format is invalid');
        }

        if (undefined === this.processors[data.type]) {
            console.error('Processor not found for type:' + data.type);
        }

        this.processors[data.type].execute(data);
    }
}
import Phaser from 'phaser'
import Wizard from '../entities/Wizard';
import Fairy from '../entities/Fairy';

export default class extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
        this.wizard = null;
        this.fairy = null;
    }

    preload() {
        this.wizard = new Wizard(this);
        this.fairy = new Fairy(this);
    }

    create() {
        // Create characters, map and others things
        this.wizard.create();
        this.fairy.create();
    }

    update() {
// Update characters, map and others things
    }


}
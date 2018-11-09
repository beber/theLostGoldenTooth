import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        // Load all assets here
    }

    update() {
        this.scene.start('GameScene')
    }
}
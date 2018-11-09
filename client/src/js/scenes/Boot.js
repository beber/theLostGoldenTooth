import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        // Load all assets here
        this.load.atlas('wizard', 'assets/game/wizard/wizard.png', 'assets/game/wizard/wizard.json');
    }

    create() {
        let title = this.add.text(400, 300, 'The Lost Golden Tooth', {
            fontSize: '60px',
            fontFamily: 'Arial',
            color: '#ffffff',
        });
        title.setOrigin(0.5);
        // setTimeout(() => {
        this.scene.start('GameScene')
        // }, 2000)
    }
}
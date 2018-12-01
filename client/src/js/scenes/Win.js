import Phaser from "phaser";

export default class extends Phaser.Scene {
    constructor() {
        super({key: 'Win', active: false});
    }

    create() {
        let bg = this.make.graphics()
            .fillStyle(0x000000)
            .setAlpha(0.4)
            .fillRect(0, 0, 800, 600)
        ;
        bg.generateTexture('bg', 800, 600);
        bg.destroy();

        bg = this.add.image(400, 300, 'bg');
        bg.setScrollFactor(0);
        bg.setOrigin(0.5);

        let end = this.add.text(400, 300, 'You Win !!!', {
            fontSize: '60px',
            fontFamily: 'Arial',
            color: '#ffffff'
        });
        end.setScrollFactor(0);
        end.setOrigin(0.5);

        let retry = this.add.image(400, 400, 'retry');
        retry.setScrollFactor(0);
        retry.setOrigin(0.5);
        retry.setInteractive();

        retry.on('pointerdown', () => {
            this.scene.stop();

            let game = this.scene.get('GameScene');
            game.scene.restart();
        });
    }
}
import '../scss/page/main.scss';
import Phaser from 'phaser';
import BootScene from './scenes/Boot'
import GameScene from './scenes/Game'
import Socket from './Socket'
import config from './config';
import spells from './spells/spells';

const gameConfig = Object.assign(config, {
    type: Phaser.CANVAS,
    fps: 25,
    scene: [BootScene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 1600}
        }
    }
});

class Game extends Phaser.Game {
    constructor() {
        super(gameConfig);

    }
}

window.game = new Game();
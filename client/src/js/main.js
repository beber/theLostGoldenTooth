import '../scss/page/main.scss';
import Phaser from 'phaser';
import BootScene from './scenes/Boot'
import GameScene from './scenes/Game'
import config from './config';
import Loose from "./scenes/Loose";
import Win from "./scenes/Win";

const gameConfig = Object.assign(config, {
    type: Phaser.CANVAS,
    fps: 25,
    scene: [BootScene, GameScene, Loose, Win],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
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
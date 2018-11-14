import '../scss/page/main.scss';
import Phaser from 'phaser';

import BootScene from './scenes/Boot'
import GameScene from './scenes/Game'

import Socket from './Socket'

import config from './config'
import MobileControls from "./MobileControls";

const gameConfig = Object.assign(config, {
    scene: [BootScene, GameScene]
});

class Game extends Phaser.Game {
    constructor(socket) {
        super(gameConfig);

        this.socket = socket;
    }
}

let socket = new Socket(playerInformation);

if (document.getElementById('game')) {
    window.game = new Game(socket);
} else {
    window.controls = new MobileControls(socket);
}


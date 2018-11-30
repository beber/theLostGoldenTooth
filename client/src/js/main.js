import '../scss/page/main.scss';
import Phaser from 'phaser';

import BootScene from './scenes/Boot'
import GameScene from './scenes/Game'

import Socket from './Socket'
import MobileControls from "./MobileControls";

import config from './config';
import spells from './spells/spells';

const gameConfig = Object.assign(config, {
    scene: [BootScene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 1500}
        }
    }
});

class Game extends Phaser.Game {
    constructor() {
        super(gameConfig);

    }
}

if (document.getElementById('game')) {
    window.game = new Game();
} else {
    let socket = new Socket(playerInformation);

    window.controls = new MobileControls(socket, spells.spells);
}


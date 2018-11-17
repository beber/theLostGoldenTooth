import '../scss/page/main.scss';
import Phaser from 'phaser';

import BootScene from './scenes/Boot'
import GameScene from './scenes/Game'

import SpellProcessor from "./processors/SpellProcessor";
import ElementProcessor from "./processors/ElementProcessor";

import Socket from './Socket'
import MobileControls from "./MobileControls";
import HUDController from "./HUDController";

import spells from './spells/spells';
import config from './config';

const gameConfig = Object.assign(config, {
    scene: [BootScene, GameScene]
});

class Game extends Phaser.Game {
    constructor(socket) {
        super(gameConfig);

        this.hudController = new HUDController();
        this.processors = {
            'element': new ElementProcessor(this),
            'spell': new SpellProcessor(this, spells.spells)
        };
        
        this.socket = socket;

        this.socket.on('message', (data) => {
            this.processMessage(data);
        });
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

let socket = new Socket(playerInformation);

if (document.getElementById('game')) {
    window.game = new Game(socket);
} else {
    window.controls = new MobileControls(socket, spells.spells);
}


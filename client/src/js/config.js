import Phaser from 'phaser'

export default {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    localStorageName: 'phaser',
    scaleMode: 0, //Phaser.ScaleManager.EXACT_FIT
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1600},
            debug: true
        }
    }
}
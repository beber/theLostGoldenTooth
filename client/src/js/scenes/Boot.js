import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        // Load all assets here
        this.load.atlas('wizard', 'assets/game/wizard/wizard.png', 'assets/game/wizard/wizard.json');
        this.load.atlas('goblin', 'assets/game/goblin/goblin.png', 'assets/game/goblin/goblin.json');
        this.load.spritesheet('fairy',
            'assets/game/fairy/fairy-tilesprite.png',
            {
                frameWidth: 64,
                frameHeight: 64
            }
        );
        this.load.spritesheet('spell-fly', 'assets/game/spells/wind-spell.png',
            {
                frameWidth: 64,
                frameHeight: 64
            }
        );
        this.load.spritesheet('spell-break', 'assets/game/spells/hit-break.png',
            {
                frameWidth: 128,
                frameHeight: 128
            }
        );
        this.load.spritesheet('spell-fireball', 'assets/game/spells/fireball.png',
            {
                frameWidth: 83,
                frameHeight: 83
            }
        );
        this.load.spritesheet('items', 'assets/game/items/items.png',
            {
                frameWidth: 32,
                frameHeight: 32
            }
        );
        this.load.image('tiles', 'assets/game/levels/tiles_spritesheet.png');
        this.load.image('tilestest', 'assets/game/levels/spritessheets/test-extruded.png');
        this.load.image('panel', 'assets/game/levels/panel.png');
        this.load.tilemapTiledJSON('level1', 'assets/game/levels/level1.json');
        this.load.tilemapTiledJSON('leveltest', 'assets/game/levels/leveltest.json');
        this.load.tilemapTiledJSON('levelfinal', 'assets/game/levels/levelfinal.json');
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
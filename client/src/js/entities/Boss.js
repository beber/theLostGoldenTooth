import Goblin from './Goblin';

export default class Boss extends Goblin {
    constructor(config) {
        super({scene: config.scene, x: config.x, y: config.y});
        this.xVelocity = 200;
        this.yVelocity = -500;
        this.health = 400;
        this.feelMinDistance = 500;
        this.delayReflexion = 400;
        // this.create();
    }

    create() {
        super.create();
        this.setScale(2);
    }
}
import Goblin from './Goblin';

export default class Boss extends Goblin {
    constructor(scene) {
        super(scene);
        this.xVelocity = 200;
        this.yVelocity = -500;
        this.health = 400;
        this.feelMinDistance = 500;
        this.delayReflexion = 400;
    }

    create() {
        super.create();
        this.entity.setScale(2);
    }
}
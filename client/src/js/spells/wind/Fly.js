import Spell from '../Spell';

export default class extends Spell
{
    constructor(scene) {
        super(scene);
    }

    preload() {

    }

    execute() {
        this.scene.wizard.xVelocity = 800;
    }

    update() {

    }
}

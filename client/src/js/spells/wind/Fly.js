import Spell from '../Spell';

export default class extends Spell
{
    constructor(scene) {
        super(scene);
    }

    execute() {
        this.scene.wizard.xVelocity = 800;
    }
}

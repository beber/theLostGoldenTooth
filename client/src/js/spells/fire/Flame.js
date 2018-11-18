import Spell from '../Spell';

export default class extends Spell
{
    constructor(scene) {
        super(scene);
    }

    execute() {
        console.log('flame');

    }
}
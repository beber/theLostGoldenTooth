import Wizard from "../entities/Wizard";

export default class {
    constructor(scene) {
        this.scene = scene;
    }

    execute()
    {
        if (!this.can()) {
            return;
        }

        this.scene.wizard.currentState = Wizard.STATE.spelling;

        if (-1 === this.launch()) {
            return;
        }

        this.scene.wizard.mana -= this.cost;
        this.scene.hudController.elements.mana.update();
    }

    can()
    {
        return this.scene.wizard.mana - this.cost >= 0;
    }
}
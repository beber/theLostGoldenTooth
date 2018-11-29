export default class {
    constructor(scene) {
        this.scene = scene;
    }

    execute()
    {
        if (!this.can()) {
            return;
        }

        this.launch();

        this.scene.wizard.mana -= this.cost;
        this.scene.hudController.update();
    }

    can()
    {
        return this.scene.wizard.mana - this.cost >= 0;
    }
}
import Bar from "./Bar";

export default class extends Bar {
    constructor(scene) {
        super(scene);

        this.max = this.current = this.scene.wizard.mana;
        this.fgColor = 0x0055ff;
        this.key = 'mana';
        this.width = 150;
        this.height = 15;
        this.position = {
            x: 20,
            y: 45
        }
    }

    update() {
        this.current = this.scene.wizard.mana;
        this.updateBar();
    }
}
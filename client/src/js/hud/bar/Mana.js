import Bar from "./Bar";

export default class extends Bar {
    constructor(scene) {
        super(scene);

        this.fgColor = 0x0000ff;
        this.key = 'mana';
        this.width = 150;
        this.height = 15;
        this.position = {
            x: 20,
            y: 45
        }
    }
}
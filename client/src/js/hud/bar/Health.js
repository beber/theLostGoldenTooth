import Bar from "./Bar";

export default class extends Bar {
    constructor(scene) {
        super(scene);

        this.fgColor = 0x00ff00;
        this.key = 'health';
        this.width = 300;
        this.height = 20;
        this.position = {
            x: 20,
            y: 20
        }
    }
}
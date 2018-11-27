export default class {
    constructor(scene) {
        this.scene = scene;

        this.elements = [];
    }

    addItem(item) {
        this.elements.push(item);
    }

    removeItem(item) {
        this.elements.splice(this.elements.indexOf(item), 1);
    }
}
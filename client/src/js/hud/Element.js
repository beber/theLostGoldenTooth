export default class {
    constructor(scene) {
        this.scene = scene;
    }

    load() {
        this.element = this.scene.add.text(180, 45, this.scene.fairy.currentElement, { fontSize: '16px', fill: '#000'});

        this.element.setScrollFactor(0);
        this.element.setOrigin(0);
    }

    update() {
        this.element.setText(this.scene.fairy.currentElement);
    }
}
export default class {
    constructor(scene) {
        this.scene = scene;
    }

    load() {
        this.element = this.scene.add.text(
            this.scene.cameras.main.width - 20,
            this.scene.cameras.main.height - 20,
            this.scene.goblins.children.entries.length,
            { fontSize: '32px', fill: '#000'}
        );

        this.element.setScrollFactor(0);
        this.element.setOrigin(1, 1);
    }

    update() {
        console.log('plop');
        this.element.setText(this.scene.goblins.children.entries.length);
    }
}
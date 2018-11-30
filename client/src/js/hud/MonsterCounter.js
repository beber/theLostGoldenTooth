export default class {
    constructor(scene) {
        this.scene = scene;
    }

    load() {
        this.picture = this.scene.add.image(
            this.scene.cameras.main.width - 90,
            this.scene.cameras.main.height - 40,
            'goblin'
        );

        this.element = this.scene.add.text(
            this.scene.cameras.main.width - 40,
            this.scene.cameras.main.height - 40,
            this.scene.goblins.children.entries.length,
            { fontSize: '32px', fill: '#000'}
        );

        this.picture.setScrollFactor(0);
        this.picture.setScale(0.5, 0.5);
        this.picture.setOrigin(1, 0.5);

        this.element.setScrollFactor(0);
        this.element.setOrigin(1, 0.5);
    }

    update() {
        this.element.setText(this.scene.goblins.children.entries.length);
    }
}
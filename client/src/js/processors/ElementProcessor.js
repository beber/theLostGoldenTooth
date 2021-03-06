export default class {
    constructor(scene) {
        this.scene = scene;
        this.elements = ["earth", "transe", "fire", "water", "wind"];
    }

    preload() {
        for (let i in this.elements) {
            let start = i * 54;
            this.scene.anims.create({
                key: 'fairy-idle-' + this.elements[i],
                frames: this.scene.anims.generateFrameNumbers('fairy', {start: start + 6, end: start + 8}),
                frameRate: 10,
                repeat: -1
            });
        }
    }

    execute(data) {
        this.scene.fairy.currentElement = data.value;
        this.scene.hudController.elements.element.update();
        this.scene.fairy.entity.play('fairy-idle-' + this.scene.fairy.currentElement);
    }

    update() {

    }
}
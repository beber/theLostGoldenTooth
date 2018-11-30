export default class {
    constructor(scene) {
        this.scene = scene;
        this.timer = 0.00;
    }

    load() {
        this.element = this.scene.add.text(
            this.scene.cameras.main.width - 20,
            20,
            this.timer,
            { fontSize: '32px', fill: '#000'}
        );

        this.element.setScrollFactor(0);
        this.element.setOrigin(1, 0);

        this.scene.time.addEvent({delay: 10, callback: this.tick, callbackScope: this, loop: true})
    }

    tick() {
        this.timer = this.timer + 0.01;
        this.element.setText(this.timer.toFixed(2));
    }
}
import * as Phaser from "phaser";

export default class {
    constructor(scene) {
        this.scene = scene;
        this.bgColor = 0x000000;
        this.border = 2;
    }

    load() {
        let bgKey = 'bg_' + this.key;
        let fgKey = 'fg_' + this.key;
        let bg = this.scene.make.graphics().fillStyle(this.bgColor).fillRect(0, 0, this.width, this.height);
        bg.generateTexture(bgKey, this.width, this.height);
        bg.destroy();

        this.bg = this.scene.add.image(this.position.x, this.position.y, bgKey);
        this.bg.setScrollFactor(0);
        this.bg.setOrigin(0);

        let fg = this.scene.make.graphics().fillStyle(this.fgColor).fillRect(0, 0, this.width - this.border*2, this.height - this.border*2);
        fg.generateTexture(fgKey, this.width - this.border*2, this.height - this.border*2);
        fg.destroy();

        this.fg = this.scene.add.image(this.position.x + this.border, this.position.y + this.border, fgKey);
        this.fg.setScrollFactor(0);
        this.fg.setOrigin(0);

    }

    updateBar() {
        let crop = new Phaser.Geom.Rectangle(0, 0, this.getWidth(), this.height);
        this.fg.setCrop(crop);
    }

    getWidth() {
        return this.width * (this.current / this.max);
    }
}

export default class {
    constructor(scene)
    {
        this.scene = scene;
    }

    preload() {

    }

    execute(data)
    {
        this.scene.hudController.update('element', data.value);
        this.scene.fairy.currentElement = data.value;
    }

    update() {

    }
}
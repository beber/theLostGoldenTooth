export default class {
    constructor(scene)
    {
        this.scene = scene;
    }

    execute(data)
    {
        this.scene.hudController.update('element', data.value);
        this.scene.fairy.currentElement = data.value;
    }
}
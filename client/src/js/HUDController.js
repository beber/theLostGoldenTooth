export default class {
    constructor()
    {
        this.outputs = {
            'element': document.getElementById('hud-element')
        }
    }

    update(element, value)
    {
        if (undefined === this.outputs[element] || null === this.outputs[element]) {

            return;
        }

        this.outputs[element].innerHTML = value;
    }
}
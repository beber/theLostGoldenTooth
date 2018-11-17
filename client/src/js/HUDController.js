export default class {
    constructor()
    {
        this.outputs = {
            'element': document.getElementById('hud-fire')
        }
    }

    update(element, value)
    {
        console.log(this.outputs[element]);
        if (undefined === this.outputs[element] || null === this.outputs[element]) {
            console.error('element ' + element + ' not found');

            return;
        }

        this.outputs[element].innerHTML = value;
    }
}
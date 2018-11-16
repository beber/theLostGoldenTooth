export default class {

    constructor(socket)
    {
        this.socket = socket;
        this.interval = 70;
        this.comboContainer = document.getElementById('combo-container');

        this.loadComboSystem();
        this.loadElementSystem();
    }

    onCombo(inputs) {
        this.comboContainer.innerHTML = inputs.toString();
        this.socket.send('message', {"type": "combo", "value": inputs});
    }

    onElementChange(id) {
        document.getElementsByTagName('body').item(0).setAttribute('class', id);
        this.socket.send('message', {"type":"element","value":id});
    }

    loadElementSystem() {
        this.elementInputs = document.getElementsByClassName('element-input');

        for (let i = 0;i< this.elementInputs.length;++i) {
            this.elementInputs.item(i).onclick = (e) => {
                this.onElementChange(this.getInput(e).id);
            }
        }
    }

    getInput(e) {
        return e.originalTarget !== undefined ? e.originalTarget : e.srcElement;
    }

    loadComboSystem() {
        console.log('load combo system');

        this.comboInputs = document.getElementsByClassName('combo-input');
        this.inputs = [];
        this.inputInterval = this.interval;

        this.comboInterval = setInterval(() => {
            if (0 === this.inputs.length) {
                return;
            }
            this.inputInterval = this.inputInterval - 1;

            if (0 === this.inputInterval) {
                this.onCombo(this.inputs);
                this.inputs = [];
            }

        }, 1);

        for (let i = 0;i< this.comboInputs.length;++i) {
            this.comboInputs.item(i).onclick = (e) => {
                this.inputs.push(this.getInput(e).id);
                this.inputInterval = this.interval
            }
        }
    }
}

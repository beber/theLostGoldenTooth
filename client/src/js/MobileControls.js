export default class {

    constructor(socket, spells) {
        this.currentElement = 'earth';
        this.spells = spells;
        this.socket = socket;
        this.interval = 50;
        this.spellListContainer = document.getElementById('spell-list');
        this.fullScreenButton = document.getElementById('fullscreen');
        this.fullScreen = false;

        this.loadFullScreenMode();
        this.loadComboSystem();
        this.loadElementSystem();
    }

    loadFullScreenMode() {
        if (this.canFullScreen()) {
            this.addFullScreenButton();
        }
    }

    toggleFullScreenButton() {
        let e = document.getElementById('fullscreen');
        if (!this.fullScreen) {
            this.fullScreen = true;
            this.fullScreenButton.onclick = () => {
                this.exitFullScreen();
            }
        } else {
            this.fullScreen = false;
            this.fullScreenButton.onclick = () => {
                this.goFullScreen();
            }
        }
    }

    exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        this.toggleFullScreenButton();
    }

    goFullScreen() {
        let i = document.getElementById("gamepad");

        if (i.requestFullscreen) {
            i.requestFullscreen();
        } else if (i.webkitRequestFullscreen) {
            i.webkitRequestFullscreen();
        } else if (i.mozRequestFullScreen) {
            i.mozRequestFullScreen();
        } else if (i.msRequestFullscreen) {
            i.msRequestFullscreen();
        }

        this.toggleFullScreenButton();
    }

    addFullScreenButton() {
        this.fullScreenButton.classList.add('enable');
        this.fullScreenButton.onclick = () => {
            this.goFullScreen();
        };
    }

    canFullScreen() {
        return document.fullscreenEnabled
            || document.webkitFullscreenEnabled
            || document.mozFullScreenEnabled
            || document.msFullscreenEnabled
        ;
    }

    onSpell(spell) {
        let spellDescription = document.getElementById('legend-' + spell.name);
        spellDescription.className = 'active';
        setTimeout(() => {
            spellDescription.className = '';
        }, 200);

        this.socket.send('message', {"type": "spell", "value": spell});
    }

    onElementChange(id) {
        this.currentElement = id;
        document.getElementById('gamepad').setAttribute('class', id);
        this.socket.send('message', {"type": "element", "value": id});
    }

    loadElementSystem() {
        this.elementInputs = document.getElementsByClassName('element-input');

        for (let i = 0; i < this.elementInputs.length; ++i) {
            this.elementInputs.item(i).onclick = (e) => {
                this.onElementChange(this.getInput(e).id);
            }
        }
    }

    getInput(e) {
        return e.originalTarget !== undefined ? e.originalTarget : e.srcElement;
    }

    loadComboSystem() {
        this.loadSpells();

        this.comboInputs = document.getElementsByClassName('combo-input');
        this.inputs = [];
        this.inputInterval = this.interval;

        this.comboInterval = setInterval(() => {
            if (0 === this.inputs.length) {
                return;
            }
            this.inputInterval = this.inputInterval - 1;

            if (0 === this.inputInterval) {
                let combo = this.getCombo();

                if (null === combo) {
                    this.inputs = [];

                    return;
                }

                this.onSpell(combo);
                this.inputs = [];
            }

        }, 1);

        for (let i = 0; i < this.comboInputs.length; ++i) {
            this.comboInputs.item(i).onclick = (e) => {
                this.inputs.push(this.getInput(e).id);
                this.inputInterval = this.interval
            }
        }
    }

    loadSpells() {
        for (let i in this.spells) {
            this.addSpell(this.spells[i]);
        }
    }

    addSpell(spell) {
        let spellDescription = document.createElement('li');
        spellDescription.id = 'legend-' + spell.name;
        spellDescription.innerHTML = spell.name + ' (' + spell.element + ') : ' + spell.legend;
        this.spellListContainer.append(spellDescription);
    }

    getCombo() {
        for (let i in this.spells) {
            if (this.spells[i].element === this.currentElement && this.spells[i].inputs.toString() === this.inputs.toString()) {
                return this.spells[i];
            }
        }

        return null;
    }
}

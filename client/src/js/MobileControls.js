export default class {

    constructor(socket, spells)
    {
        this.currentElement = 'wind';
        this.spells = spells;
        this.socket = socket;
        this.interval = 100;
        this.comboContainer = document.getElementById('combo-container');
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
            e.onclick = () => {
                this.exitFullScreen();
            }
        } else {
            this.fullScreen = false;
            e.onclick =  () => {
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
        let div = document.createElement('div');
        div.innerHTML = '<div id="fullscreen">FullScreen</div>';
        div.onclick = () => {
            this.goFullScreen();
        };
        document.getElementById("gamepad").appendChild(div);
    }

    canFullScreen() {
        return document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled;
    }

    onSpell(spell) {
        this.comboContainer.innerHTML = spell.inputs.toString();
        this.socket.send('message', {"type": "spell", "value": spell});
    }

    onElementChange(id) {
        this.currentElement = id;
        document.getElementById('gamepad').setAttribute('class', id);
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
                let combo = this.getCombo();

                if (null === combo) {
                    this.inputs = [];

                    return;
                }

                this.onSpell(combo);
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

    getCombo() {
        for(let i in this.spells) {
            if (this.spells[i].element === this.currentElement && this.spells[i].inputs.toString() === this.inputs.toString()) {
                return this.spells[i];
            }
        }

        return null;
    }
}

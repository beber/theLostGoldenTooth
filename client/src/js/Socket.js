import QRCode from 'qrcode';

export default class {
    constructor(data) {
        this.data = data;
        this.callbacks = [];
        this.socket = io.connect(window.location.origin);
        this.socket.emit('init', data);

        this.socket.on('init', (data) => {
            this.onInit(data);
        });
        this.socket.on('sync', (data) => {
            this.processCallback('sync', data);
        });
        this.socket.on('message', (data) => {
            this.processCallback('message', data);
        });
        this.socket.on('leave', (data) => {
            this.processCallback('leave', data);
        });
    }

    on(eventName, callback) {
        this.callbacks[eventName] = callback;
    }

    send(eventName, data) {
        this.socket.emit(eventName, data);
    }

    onInit(data) {
        if (data.code !== undefined) {
            let mobileUrl = window.location.origin + "/mobile?code=" + data.code;

            let qr = document.getElementById('qr');

            QRCode.toCanvas(qr, mobileUrl, (error) => {
                if (error) console.error(error);
                document.getElementById('link').innerHTML = "Scan the following QR code to start the game (If qr code doesn't work, follow this link on mobile: " + mobileUrl + ")";
            });
        }

        this.processCallback('init', data);
    }

    processCallback(eventName, data) {
        if (undefined !== this.callbacks[eventName]) {
            this.callbacks[eventName](data);
        }
    }
}
export default class {
    constructor(data)
    {
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

    on(eventName, callback)
    {
        this.callbacks[eventName] = callback;
    }

    send(eventName, data)
    {
        this.socket.emit(eventName, data);
    }

    onInit(data)
    {
        if (data.code !== undefined) {
            document.getElementById('link').innerHTML = "<a onclick=\"open(\'" + window.location.origin + "/mobile?code=" + data.code + "\', \'Popup\', \'scrollbars=1,resizable=1,height=350,width=770\'); return false;\">go to mobile</a>";
        }

        this.processCallback('init', data);
    }

    processCallback(eventName, data)
    {
        if (undefined !== this.callbacks[eventName]) {
            this.callbacks[eventName](data);
        }
    }
}
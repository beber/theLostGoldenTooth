export default class {
    constructor(data)
    {
        this.data = data;

        this.socket = io.connect('http://web.tlgt:8080/');
        this.socket.emit('init', data);

        this.socket.on('init', (data) => {
            this.onInit(data);
        });
        this.socket.on('sync', (data) => {
            this.onSync(data);
        });
        this.socket.on('message', (data) => {
            this.onMessage(data);
        });
        this.socket.on('leave', (data) => {
            this.onDisconnect(data);
        });
    }

    send(eventName, data)
    {
        this.socket.emit(eventName, data);
    }

    onInit(data)
    {
        if (data.code !== undefined) {
            document.getElementById('link').innerHTML = '<a target="_blank" href="http://web.tlgt:8080/mobile?code=' + data.code + '">go to mobile</a>';
        }
    }

    onSync(data)
    {
        console.log("your are sync with: " + data.player);

        if ('mage' === this.data.type) {
            this.socket.emit('message', {message: 'Bonjour, je suis le mage'});
        }
    }

    onMessage(data)
    {
        console.log(data);
    }

    onDisconnect(data)
    {
        console.log("Your partner is disconnected");
    }
}

const thinkgear = require('node-thinkgear-sockets');
const { Observable } = require('rxjs/Rx');
const io = require('socket.io')(4501);

const client = thinkgear.createClient();

client.connect();

const brainwaves = Observable.fromEvent(client, 'data')
    .subscribe(data => sendToBrowser(data, 'eeg'));

const blinks = Observable.fromEvent(client, 'blink_data')
    .subscribe(data => sendToBrowser(data, 'blinks'));

function sendToBrowser (data, metric) {
    console.log(metric, data);
    io.emit(`metric:${ metric }`, data);
}

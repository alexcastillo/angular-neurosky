
const thinkgear = require('node-thinkgear-sockets');
const { fromEvent } = require('rxjs/observable/fromEvent');
const io = require('socket.io')(4501);

const client = thinkgear.createClient();

client.connect();

fromEvent(client, 'data')
    .subscribe(data => sendToBrowser(data, 'eeg'));

fromEvent(client, 'blink_data')
    .subscribe(data => sendToBrowser(data, 'blinks'));

function sendToBrowser (data, metric) {
    console.log(metric, data);
    io.emit(`metric:${ metric }`, data);
}

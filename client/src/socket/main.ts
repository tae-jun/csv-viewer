import socketIOClient = require('socket.io-client');
var config:any = global.config.socket;

var socket = socketIOClient('http://' + config.host + ':' + config.port);
console.log('=== Socket.io connecting...');

socket.on('connect', ()=> {
    console.log('+++ Socket.io connected');
});

socket.on('error', (err)=> {
    console.error('--- Socket.io connection error');
    console.error(err);
});

export function onList(listener:(fn)=>void) {
    socket.on('list', listener);
}

export function onGetLog(listener:(logFileName, fn)=>void) {
    socket.on('getLog', listener);
}
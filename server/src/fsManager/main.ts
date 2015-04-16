import path = require('path');
import fs = require('fs');

var config = global.config.fsManager;

var io:SocketIO.Server = require('../app').io;

var socket:SocketIO.Socket;

try {
    fs.mkdirSync(config.logDir);
}
catch (e) {
}

// On socket.io connected
io.on('connection', (_socket)=> {
    console.log('+++ New incoming socket.io connection');
    socket = _socket;

    socket.on('error', (err)=> {
        console.error('--- Socket connection error');
        console.error(err);
        socket = null;
    });

    socket.on('disconnect', ()=> {
        console.log('--- Socket disconnected');
        socket = null;
        process.exit(1);
    });
});

/**
 * @param callback data: array of file names
 */
export function list(callback:(err, data:string[])=>void) {
    if (socket == null)
        return callback(new Error('Socket is closed'), null);

    var start = new Date().getTime();
    // Request to client
    socket.emit('list', (data)=> {
        callback(null, data);
        var end = new Date().getTime();
        console.log('+++ FsManager: list - %dms', (end - start));
    });
}

export function getLogFile(fileName:string, callback:(err, file)=>void) {
    if (socket == null)
        return callback(new Error('Socket is closed'), null);

    var start = new Date().getTime();
    // Request to client
    socket.emit('getLog', fileName, (data)=> {
        callback(null, data);
        var end = new Date().getTime();
        console.log('+++ FsManager: getLog:%s - %dms', fileName, (end - start));

        // Save log file as local
        fs.writeFile(path.resolve(config.logDir, fileName), data);
    });
}
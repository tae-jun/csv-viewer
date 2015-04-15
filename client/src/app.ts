// Setup default or user defined configuration
require('./configLoader');
console.log('=== App config');
console.log(global.config);

import async = require('async');

// Start Socket.IO Client
import socket = require('./socket/main');
import fs = require('fs');

socket.onList((fn)=> {
    console.log('+++ Incoming "list" request');
    var start = new Date().getTime();

    fs.readdir('/Users/jun/sensor-log/csv', (err, files)=> {
        if (err)return console.error(err);
        // Response
        fn(files);
        var end = new Date().getTime();
        console.log('+++ Response "list" - %dms', (end - start));
    });
});

socket.onGetLog((fileName, fn)=> {
    console.log('+++ Incoming "getLog:%s" request', fileName);
    var start = new Date().getTime();

    fs.readFile('/Users/jun/sensor-log/csv/' + fileName, {encoding: null}, (err, data)=> {
        if (err)return console.error(err);
        // Response
        fn(data);
        var end = new Date().getTime();
        console.log('+++ Response "list" - %dms', (end - start));
    });
});
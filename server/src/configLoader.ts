import path = require('path');

global.config = require('./config');
global.config.$projectHome = path.resolve(__dirname, '../../');

var projectHome = global.config.$projectHome;

// Setup route config
var route = global.config.route;
route.distDir = path.resolve(projectHome, route.distDir);
route.imgDir = path.resolve(projectHome, route.imgDir);
route.bowerDir = path.resolve(projectHome, route.bowerDir);

// Setup fsManager config
var fsManager = global.config.fsManager;
fsManager.logDir = path.resolve(projectHome, fsManager.logDir);
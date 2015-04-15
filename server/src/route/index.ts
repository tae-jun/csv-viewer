import path = require('path');
import express = require('express');
var config = global.config.route;

var router = express.Router();
router

    .use('/', express.static(config.distDir))

    .use('/download', require('./download/index'))

    .use('/log', require('./log/index'))

    .use('/img', express.static(config.imgDir))

    .use('/bower', express.static(config.bowerDir));

export = router;
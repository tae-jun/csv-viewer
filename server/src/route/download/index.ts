import express = require('express');
import path = require('path');

var router = express.Router();
router

    .get('/:fileName', (req, res, next)=> {
        var fileName = req.params.fileName;
        res.download(path.resolve(global.config.fsManager.logDir, fileName));
    });

export = router;
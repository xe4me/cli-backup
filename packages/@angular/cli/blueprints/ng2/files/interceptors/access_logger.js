'use strict';

var log = require('ddcjs-logger')('access_logger');

module.exports = function(app) {

    app.all('*', function(req, res, next) {
        if (req.query['dump']) {
            log.info(req.protocol + '://' + req.get('host') + req.originalUrl + ' => ' + JSON.stringify(req.headers));
        }
        next();
    });

};


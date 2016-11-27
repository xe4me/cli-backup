// For Production use only
var config = require('./server.config');
var server = require('ddcjs-server');

server.initialise(config).then(server.start).catch(function(err){
    console.error(err);
});

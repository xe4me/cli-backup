// Webpack is using a middleware which is in here https://github.com/chimurai/http-proxy-middleware#options
module.exports = {
    '/ddc/public/*': {
        target: 'http://localhost:3001',
        pathRewrite: function (req) {
            console.log('req.url',req.url);
            req.url = req.url.replace(/^\/ddc\/public/, '/src/assets');
        }
    },
    '*/ddc/public/*': {
        target: 'http://localhost:3001',
        pathRewrite: function (req) {
            console.log('req.url',req.url);
            req.url = req.url.replace(/\/ddc\/public/, '/src/assets');
        }
    },
    '*/qas/**': {
        target: 'https://ddc-dev.digital-pilot.ampaws.com.au',
        //target: 'http://localhost:8082',
        pathRewrite: function (path, req) {
            req.url = req.url.replace('qas', 'ddc/public/api/qas');
        },
        secure :false, // to buypass the ssl
        logLevel: 'debug'
    },
    '*/refdata/**': {
        target: 'https://ddc-dev.digital-pilot.ampaws.com.au',
        //target: 'http://localhost:8082',
        pathRewrite: function (path, req) {
            req.url = req.url.replace('refdata/countries', 'ddc/public/api/refdata/countries');
        },
        secure :false,// to buypass the ssl
        logLevel: 'debug'
    }
};

const EXPERIENCE_NAME = 'components';
var express = require('express');
const ENV = process.env.ENV || 'development';
var path = require('path');
var proxy = require('http-proxy-middleware');
var apiProxy = proxy({
    target: 'https://ddc-dev.digital-pilot.ampaws.com.au',
    pathRewrite: function (path, req) {
        // Removing this header as it's not all the apis want it
        delete req.headers['apikey'];
    },
    secure:false,
    changeOrigin: true,             // for vhosted sites, changes host header to match to target's host
    logLevel: 'debug'
});
module.exports = {
    init : function(app) {

        // Serve environment specific config resources
        app.get( '/config.js', function(req, res) {
            res.set('Content-Type', 'application/javascript');
            res.status(200).send(
                'var _process_env = ' + JSON.stringify(
                    {
                        ApiCallsBaseUrl:'ddc/public/api' ,
                        ENV: ENV,
                        experienceName: EXPERIENCE_NAME,
                        GoogleApiKey: '',
                        TamServicePath: 'http://localhost:1234',
                        GwPracticeService: {
                            ApiKey: '',
                            EnvPath: '',
                            Path: '',
                        },
                        GwDDCService: {
                            ApiKey: '',
                            EnvPath: '',
                            Path: '',
                        },
                        GreenId: {
                            configScriptUrl: 'https://test2.edentiti.com/df/javascripts/greenidConfig.js',
                            uiScriptUrl: 'https://test2.edentiti.com/df/javascripts/greenidui.min.js',
                            styleUrl: 'https://test2.edentiti.com/df/assets/stylesheets/greenid.css',
                            environment: 'test'
                        },
                        GoogleRecaptcha: {
                            sitekey: '6LeqZgsUAAAAAD9-le6RQUkUv5MTjhsSM-SldWKq'
                        },
                        DamContentUrl: 'https://www.amp.com.au/content/dam/'
                    }
                )
            );
        });

        // Allow all static resources
        app.use(express.static(path.join(__dirname, '../dist')));
    
    
    
        /**
         * Add the proxy for all the api request
         * We want all the request that has ddc/public/api to be redirected to https://ddc-dev.digital-pilot.ampaws.com.au
         * secure:false : to pass the ssl
         *
         */
        app.use('/ddc/public/api', apiProxy);
    
        // For all 404 item map it back to Angular app for HTML5 push state client URL resolution
        app.use(function(req, res) {
            res.status(200).sendfile('dist'  + '/index.html');
        });
    }
};

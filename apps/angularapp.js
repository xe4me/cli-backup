const EXPERIENCE_NAME = 'components';
var express = require('express');
const DDC_API_URL = process.env.DDC_API_URL || 'https://ddc-dev.digital-pilot.ampaws.com.au/ddc/public/api';
const ENV = process.env.ENV || 'development';
var path = require('path');
module.exports = {
    init : function(app) {

        // Serve environment specific config resources
        app.get( '/config.js', function(req, res) {
            res.set('Content-Type', 'application/javascript');
            res.status(200).send(
                'var _process_env = ' + JSON.stringify(
                    {
                        ApiCallsBaseUrl:DDC_API_URL ,
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

        // For all 404 item map it back to Angular app for HTML5 push state client URL resolution
        app.use(function(req, res) {
            res.status(200).sendfile('dist'  + '/index.html');
        });
    }
};

'use strict';

const EXPERIENCE_NAME = 'bett3r';

// Wrapped in config module
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const TAM_SERVICE_PATH = process.env.TAM_SERVICE_PATH;       // https://teamtools.amp.com.au/confluence/display/EH/API+Gateway+traffic+flow+with+TAM
const GW_ENV_SERVICE_PATH = process.env.GW_ENV_SERVICE_PATH; // Only necessary for Dev and SYS, how to nullified in UAT, PRD, DR.
const GW_PRACTICE_API_KEY = process.env.GW_PRACTICE_API_KEY;
const GW_PRACTICE_SERVICE_PATH = process.env.GW_PRACTICE_SERVICE_PATH;  // https://teamtools.amp.com.au/confluence/pages/viewpage.action?pageId=40576204
const GW_DDC_API_KEY = process.env.GW_DDC_API_KEY;
const GW_DDC_SERVICE_PATH = process.env.GW_DDC_SERVICE_PATH; // https://teamtools.amp.com.au/confluence/display/EH/Dynamic+Data+Capture+%28DDC%29+API
const DAM_CONTENT_URL = process.env.DAM_CONTENT_URL;
const AMP_ROOT_URL = process.env.AMP_ROOT_URL;
const GOOGLE_RECAPTCHA_SITEKEY = process.env.GOOGLE_RECAPTCHA_SITEKEY;
const GREEN_ID_CONFIG = process.env.GREEN_ID_CONFIG;
const GREEN_ID_UI = process.env.GREEN_ID_UI;
const GREEN_ID_CSS = process.env.GREEN_ID_CSS;
const GREEN_ID_ENVIRONMENT = process.env.GREEN_ID_ENVIRONMENT;
const GREEN_ID_ACCOUNT_ID = process.env.GREEN_ID_ACCOUNT_ID;
const GREEN_ID_PASSWORD = process.env.GREEN_ID_PASSWORD;

const EXPERIENCE_BASEURL = '/ddc/public/ui/' + EXPERIENCE_NAME;
const TAM_TRANSACTION_ID = 'tam-transaction-id';
const TAM_TRANSACTION_ID_PLACEHOLDER_REGEX = /tam-transaction-id-placeholder/g;

const express = require('express');
const router = require('express').Router();
const path = require('path');
const log = require('ddcjs-logger')('experience-' + EXPERIENCE_NAME);
const fs = require('fs');

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

// Load this small file into memory
let INDEX_HTML_PAGE = require('../dist' + EXPERIENCE_BASEURL + '/index.html');

module.exports = {
    init : function(app) {

        // Serve environment specific config resources
        app.get(EXPERIENCE_BASEURL + '/config.js', function(req, res) {
            res.set('Content-Type', 'application/javascript');
            res.status(200).send(
                'var _process_env = ' + JSON.stringify(
                    {
                        ApiCallsBaseUrl: '/ddc/public/api',
                        GoogleApiKey: GOOGLE_API_KEY,
                        ExperienceName: EXPERIENCE_NAME,
                        TamServicePath: TAM_SERVICE_PATH,
                        GwPracticeService: {
                            ApiKey: GW_PRACTICE_API_KEY,
                            EnvPath: GW_ENV_SERVICE_PATH,
                            Path: GW_PRACTICE_SERVICE_PATH,
                        },
                        GwDDCService: {
                            ApiKey: GW_DDC_API_KEY,
                            EnvPath: GW_ENV_SERVICE_PATH,
                            Path: GW_DDC_SERVICE_PATH,
                        },
                        GreenId : {
                            configScriptUrl : GREEN_ID_CONFIG,
                            uiScriptUrl : GREEN_ID_UI,
                            styleUrl : GREEN_ID_CSS,
                            environment : GREEN_ID_ENVIRONMENT,
                            accountId : GREEN_ID_ACCOUNT_ID,
                            password : GREEN_ID_PASSWORD
                        },
                        GoogleRecaptcha : {
                            sitekey : GOOGLE_RECAPTCHA_SITEKEY
                        },
                        DamContentUrl : DAM_CONTENT_URL,
                        AmpRootUrl : AMP_ROOT_URL
                    }
                )
            );
        });

        // Dynamically add the tam-transaction-id request header property into the index.html payload for DTM to use for tracking purposes
        app.get([EXPERIENCE_BASEURL + '/', EXPERIENCE_BASEURL + '/index.html'], function(req, res) {
            res.send(INDEX_HTML_PAGE.replace(TAM_TRANSACTION_ID_PLACEHOLDER_REGEX, req.headers[TAM_TRANSACTION_ID]));
        });

        // Allow all static resources
        app.use(express.static(path.join(__dirname, '../dist')));

        // For all 404 item map it back to Angular app for HTML5 push state client URL resolution
        app.use(function(req, res) {
            res.send(INDEX_HTML_PAGE.replace(TAM_TRANSACTION_ID_PLACEHOLDER_REGEX, req.headers[TAM_TRANSACTION_ID]));
        });
    }
};

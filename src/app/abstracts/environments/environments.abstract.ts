// Provided by config.js loaded on index.html
declare var _process_env : any;

export class GwServiceEnvProperty {
    // Bearer Authorization key that TAM will convert to Authorization credential for API GW to consume.
    ApiKey : string;
    // Only neccessary for Dev and SYS, will be null in UAT, PRD, DR. This is because API GW do not have a unique host per environment, so they use the Path instead to distinguish them
    EnvPath : string;
    // Portion of the URL that defines which exact API Gateway end point (i.e. /practices/1.0.0 or /ddc/1.0.0)
    Path : string;
}

/**
 * ***GENERIC*** Property JSON structure - this surfaces any properties defined in various Experience repo
 *                    1, bolrnotification.js in Experience repo
 *                    2, **Maybe** goals.js in Experience repo
 */
export class RootEnvProperty {
    // For bolrnotification.js we needed these....feel free to add more
    // {
    //     GoogleApiKey: GOOGLE_API_KEY,
    //     TamServicePath: TAM_SERVICE_PATH,
    //     GwPracticeService: {
    //         ApiKey: GW_PRACTICE_API_KEY,
    //         EnvPath: GW_ENV_SERVICE_PATH,
    //         Path: GW_PRACTICE_SERVICE_PATH,
    //     },
    //     GwDDCService: {
    //         ApiKey: GW_DDC_API_KEY,
    //         EnvPath: GW_ENV_SERVICE_PATH,
    //         Path: GW_DDC_SERVICE_PATH,
    //     }
    // }

    // For Google Address component, this is the Google MAP API key
    GoogleApiKey : string;
    // TAM portion of the URL (i.e. /services/secure) [https://teamtools.amp.com.au/confluence/display/EH/API+Gateway+traffic+flow+with+TAM]
    TamServicePath : string;
    // ES&I API Gateway configuration for Practices service [https://teamtools.amp.com.au/confluence/pages/viewpage.action?pageId=40576204]
    GwPracticeService : GwServiceEnvProperty;
    // ES&I API Gateway configuration for generic DDC service [https://teamtools.amp.com.au/confluence/display/EH/Dynamic+Data+Capture+%28DDC%29+API]
    GwDDCService : GwServiceEnvProperty;
    // ENV is one of [development, production], control via Index.html
    ENV : string;
    // Base url for api calls like : /ddc/secure/api/...
    ApiCallsBaseUrl : string;
    experienceName : string; // like : buyback , or nio , or cwc
    DamContentUrl : string; // https://www.amp.com.au
    GreenId : {
        configScriptUrl : string;
        uiScriptUrl : string;
        styleUrl : string;
        environment : string;
        accountId : string;
        password : string;
    };
    // https://www.google.com/recaptcha/admin
    GoogleRecaptcha : {
        sitekey : string; // Use this in the HTML code your site serves to users.
        secretkey : string; // Use this for communication between your site and Google.
    };

    constructor () {
        if (_process_env) {
            Object.assign(this, _process_env);
        }
    }
}

export abstract class Environments {
    public static property : RootEnvProperty = new RootEnvProperty();

    public static get host () {
        if ( Environments.property.ENV === 'development' ) {
            // return 'http://localhost:8882';
            return '';
        } else {
            /*
             * NOTE:
             * Find out what is the different env urls
             *
             * */
            return '';
        }
    }
}

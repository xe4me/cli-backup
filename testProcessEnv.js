// Used for amp-ng test only.
// If you need to customize this for your tests..which I'd be surprise but
// in a good way, feel free to, you just need a way to reload the Environment object somehow
const _process_env = {
    ENV: 'development',
    ApiCallsBaseUrl: 'http://localhost:1234',
    experienceName: 'components',
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
};

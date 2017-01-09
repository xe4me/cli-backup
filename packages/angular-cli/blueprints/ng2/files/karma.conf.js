// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'angular-cli'],
        plugins: [
            require('karma-jasmine'),
//      require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher'),
            require('karma-remap-istanbul'),
            require('amp-angular-cli/plugins/karma'),
            require('karma-coverage'),
            require('karma-junit-reporter')
        ],
        files: [
            { pattern: './testProcessEnv.js', watched: false },
            {pattern: './<%= sourceDir %>/test.ts', watched: false}
        ],
        preprocessors: {
            './<%= sourceDir %>/test.ts': ['angular-cli']
        },
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        remapIstanbulReporter: {
            reports: {
                html: 'coverage',
                lcovonly: './coverage/coverage.lcov'
            }
        },
        angularCli: {
            config: './angular-cli.json',
            environment: 'dev'
        },
        reporters: ['progress', 'karma-remap-istanbul', 'coverage', 'junit'],
        coverageReporter: {
            dir: 'reports/',
            reporters: [
                {type: 'text-summary', subdir: '.'},
                {type: 'json', subdir: '.'},
                {type: 'html', subdir: '.'},
                {type: 'cobertura', subdir: '.', file: 'cobertura-coverage.xml'}
            ]
        },
        //junit reporting
        junitReporter: {
            outputFile: '../reports/mocha-report.xml'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};

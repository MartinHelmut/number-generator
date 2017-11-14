const customLaunchers = {
    // Chrome
    sl_chrome_win: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 10',
        version: '54'
    },
    sl_chrome_mac: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'macOS 10.12',
        version: '54'
    },
    // Firefox
    sl_firefox_linux: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Linux',
        version: '44'
    },
    sl_firefox_mac: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'macOS 10.12',
        version: '49'
    },
    sl_firefox_win: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 10',
        version: '49'
    },
    // IE
    sl_ie_9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '9'
    },
    sl_ie_10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '10'
    },
    sl_ie_11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
    },
    // Edge
    sl_edge_13: {
        base: 'SauceLabs',
        browserName: 'MicrosoftEdge',
        platform: 'Windows 10',
        version: '13'
    },
    sl_edge_14: {
        base: 'SauceLabs',
        browserName: 'MicrosoftEdge',
        platform: 'Windows 10',
        version: '14'
    },
    // Safari
    sl_safari_9: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.11',
        version: '9.0'
    },
    sl_safari_10: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'macOS 10.12',
        version: '10'
    }
};

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: ['src/**/*.js'],
        reporters: ['progress', 'saucelabs'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        singleRun: true,
        concurrency: Infinity,
        sauceLabs: {
            testName: 'number-generator',
            recordScreenshots: false,
            connectOptions: {
                port: 5757,
                logfile: 'sauce_connect.log'
            },
            public: 'public',
            startConnect: false
        },
        captureTimeout: 120000, // Increase timeout in case connection in CI is slow
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers)
    })
};

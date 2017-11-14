module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: ['src/**/*.js'],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome', 'Firefox', 'Safari'],
        singleRun: true,
        concurrency: Infinity,
        preprocessors: {
            'src/**/*.js': ['babel']
        }
    })
};

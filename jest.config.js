'use strict';

module.exports = {
    collectCoverage: process.env.NODE_ENV !== 'production',
    testEnvironment: 'node',
    testRegex: '(\\.|/)(test|spec)\\.js$',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/src/fns/__tests__/helper.js'
    ]
};

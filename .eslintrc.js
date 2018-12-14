'use strict';

module.exports = {
    extends: ['eslint:recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    env: {
        node: true,
        browser: true,
        jest: true
    },
    plugins: ['compat'],
    rules: {
        'compat/compat': 'error'
    }
};

'use strict';

module.exports = {
    exclude: 'node_modules/**',
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false
            }
        ]
    ],
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: 'commonjs'
                    }
                ]
            ]
        }
    }
};

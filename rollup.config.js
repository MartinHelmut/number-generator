import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: {
        file: 'lib/index.js',
        format: 'umd',
        name: 'numberGenerator'
    },
    plugins: [
        resolve(),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: [
                [
                    'env',
                    {
                        modules: false
                    }
                ]
            ],
            plugins: ['external-helpers']
        })
    ]
};

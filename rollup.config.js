import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

function createBundleConfig(input, output = {}) {
    const fileName = input.split('/').pop();

    return {
        input: `src/${input}.js`,
        output: Object.assign(
            {
                file: `lib/${fileName}.js`,
                format: 'cjs',
                sourcemap: true,
                sourcemapFile: `lib/${fileName}.js.map`
            },
            output
        ),
        plugins: [
            resolve(),
            babel(),
            terser(),
            filesize({
                render: (_, __, { bundleSize, gzipSize }) =>
                    `Bundle size: ${bundleSize}, Gzipped size: ${gzipSize}`
            })
        ]
    };
}

export default [
    createBundleConfig('index', {
        format: 'umd',
        name: 'numberGenerator'
    }),
    createBundleConfig('index', {
        format: 'esm',
        file: 'lib/index.esm.js',
        sourcemapFile: 'lib/index.esm.js.map'
    }),
    createBundleConfig('fns/aleaRNGFactory'),
    createBundleConfig('fns/murmurhash2_x86_32'),
    createBundleConfig('fns/murmurhash3_x86_32')
];

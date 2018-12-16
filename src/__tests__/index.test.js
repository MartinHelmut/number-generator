import { assert } from 'chai';

describe('number-generator', () => {
    describe('provides compatible to version 1', () => {
        it('exports "murmurhash2_x86_32" under the alias "murmurHash"', () => {
            const { murmurHash, murmurhash2_x86_32 } = require('../index');

            assert.strictEqual(murmurhash2_x86_32, murmurHash);
        });
    });

    describe('exports named function', () => {
        it('aleaRNGFactory', () => {
            const { aleaRNGFactory } = require('../index');
            assert.isFunction(aleaRNGFactory);
        });

        it('murmurhash2_x86_32', () => {
            const { murmurhash2_x86_32 } = require('../index');
            assert.isFunction(murmurhash2_x86_32);
        });

        it('murmurhash3_x86_32', () => {
            const { murmurhash3_x86_32 } = require('../index');
            assert.isFunction(murmurhash3_x86_32);
        });
    });
});

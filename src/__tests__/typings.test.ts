import { assert } from 'chai';
import { NumberGenerator, NumberGeneratorState } from '../../lib';

describe('TypeScript', () => {
    describe('works with generated typings', () => {
        it('aleaRNGFactory.d.ts', () => {
            const aleaRNGFactory = require('../../lib/aleaRNGFactory');
            const generator: NumberGenerator = aleaRNGFactory();
            const state: NumberGeneratorState = generator.getState();

            generator.setState(state);

            assert.isFunction(aleaRNGFactory);
            assert.isObject(generator);
        });

        it('murmurhash2_x86_32.d.ts', () => {
            const murmurhash2_x86_32 = require('../../lib/murmurhash2_x86_32');
            const value = murmurhash2_x86_32('Hash');

            assert.isFunction(murmurhash2_x86_32);
            assert.isNumber(value);
        });

        it('murmurhash3_x86_32.d.ts', () => {
            const murmurhash3_x86_32 = require('../../lib/murmurhash3_x86_32');
            const value = murmurhash3_x86_32('Hash');

            assert.isFunction(murmurhash3_x86_32);
            assert.isNumber(value);
        });

        it('index.d.ts', () => {
            const { aleaRNGFactory, murmurhash2_x86_32, murmurhash3_x86_32 } = require('../../lib/index');

            assert.isFunction(aleaRNGFactory);
            assert.isFunction(murmurhash2_x86_32);
            assert.isFunction(murmurhash3_x86_32);
        });
    });
});

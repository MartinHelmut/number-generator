import { assert } from 'chai';
import { aleaRNGFactory } from '../';

describe('aleaRNGFactory', () => {
    describe('uFloat32()', () => {
        it('should return an unsigned float number without explicit seed', () => {
            const generator = aleaRNGFactory();
            const value = generator.uFloat32();

            assert.isNumber(value, 'Value is not a number');
            assert.isAbove(value, 0, 'Number is not unsigned');
            assert.isAtMost(value, 1, 'Float is larger than 1, expected larger 0, smaller 1');
            assert.isTrue(value % 1 !== 0, `Number ${value} is not an unsigned float`);
        });

        it('returns multiple different numbers on repeated call', () => {
            const generator = aleaRNGFactory();
            const value1 = generator.uFloat32();
            const value2 = generator.uFloat32();
            const value3 = generator.uFloat32();
            const value4 = generator.uFloat32();

            assert.notEqual(value1, value2, 'First to second number are not unequal');
            assert.notEqual(value2, value3, 'Second to third number are not unequal');
            assert.notEqual(value3, value4, 'Third to fourth number are not unequal');
            assert.notEqual(value4, value1, 'Fourth to first number are not unequal');
        });

        it('produces a different result with seed', () => {
            const generator1 = aleaRNGFactory(1);
            const value1 = generator1.uFloat32();
            const generator2 = aleaRNGFactory(2);
            const value2 = generator2.uFloat32();

            assert.notEqual(value1, value2);
        });

        it('produces same result on new instance with default seed', () => {
            const generator1 = aleaRNGFactory();
            const value1 = generator1.uFloat32();
            const generator2 = aleaRNGFactory();
            const value2 = generator2.uFloat32();

            assert.equal(value1, value2);
        });

        it('produces same result on new instance with custom seed', () => {
            const generator1 = aleaRNGFactory(1);
            const value1 = generator1.uFloat32();
            const generator2 = aleaRNGFactory(1);
            const value2 = generator2.uFloat32();

            assert.equal(value1, value2);
        });

        it('[loop] should return unique valid uFloat32 after repeated calls', () => {
            const generator = aleaRNGFactory();
            const iterations = 100;
            const stack = [];

            for (let i = 1; i <= iterations; i++) {
                const value1 = generator.uFloat32();
                const value2 = generator.uFloat32();

                assert.isNumber(value1, 'Value is not a number');
                assert.isAbove(value1, 0, 'Number is not unsigned');
                assert.isAtMost(value1, 1, 'Float is larger than 1, expected larger 0, smaller 1');
                assert.isTrue(value1 % 1 !== 0, `Number ${value1} is not an unsigned float`);

                assert.isNumber(value2, 'Value is not a number');
                assert.isAbove(value2, 0, 'Number is not unsigned');
                assert.isAtMost(value2, 1, 'Float is larger than 1, expected larger 0, smaller 1');
                assert.isTrue(value2 % 1 !== 0, `Number ${value2} is not an unsigned float`);

                stack.push(value1, value2);
            }

            // Test the "unique-nes" of the generated numbers
            const uniqueStack = stack.filter((value, index, self) => index === self.indexOf(value));
            const stackLength = stack.length;
            const uniqueStackLength = uniqueStack.length;

            assert.equal(
                stackLength,
                uniqueStackLength,
                `From ${iterations} iterations there where ${stackLength - uniqueStackLength} duplicates`
            );
        });
    });

    describe('uInt32()', () => {
        it('should return a unsigned integer without explicit seed', () => {
            const generator = aleaRNGFactory();
            const value = generator.uInt32();

            assert.isNumber(value, 'Value is not a number');
            assert.isAbove(value, 1, 'Number is not an unsigned integer');
            assert.isTrue(value % 1 === 0, `Number ${value} is not an unsigned integer`);
        });

        it('returns multiple different numbers on repeated call', () => {
            const generator = aleaRNGFactory();
            const value1 = generator.uInt32();
            const value2 = generator.uInt32();
            const value3 = generator.uInt32();
            const value4 = generator.uInt32();

            assert.notEqual(value1, value2, 'First to second number are not unequal');
            assert.notEqual(value2, value3, 'Second to third number are not unequal');
            assert.notEqual(value3, value4, 'Third to fourth number are not unequal');
            assert.notEqual(value4, value1, 'Fourth to first number are not unequal');
        });

        it('produces a different result with seed', () => {
            const generator1 = aleaRNGFactory(1);
            const value1 = generator1.uInt32();
            const generator2 = aleaRNGFactory(2);
            const value2 = generator2.uInt32();

            assert.notEqual(value1, value2);
        });

        it('produces same result on new instance with default seed', () => {
            const generator1 = aleaRNGFactory();
            const value1 = generator1.uInt32();
            const generator2 = aleaRNGFactory();
            const value2 = generator2.uInt32();

            assert.equal(value1, value2);
        });

        it('produces same result on new instance with custom seed', () => {
            const generator1 = aleaRNGFactory(1);
            const value1 = generator1.uInt32();
            const generator2 = aleaRNGFactory(1);
            const value2 = generator2.uInt32();

            assert.equal(value1, value2);
        });

        it('[loop] should return unique valid uInt32 after repeated calls', () => {
            const generator = aleaRNGFactory();
            const iterations = 100;
            const stack = [];

            for (let i = 1; i <= iterations; i++) {
                const value1 = generator.uInt32();
                const value2 = generator.uInt32();

                assert.isNumber(value1, 'Value is not a number');
                assert.isAbove(value1, 1, 'Number is not an unsigned integer');
                assert.isTrue(value1 % 1 === 0, `Number ${value1} is not an unsigned integer`);

                assert.isNumber(value2, 'Value is not a number');
                assert.isAbove(value2, 1, 'Number is not an unsigned integer');
                assert.isTrue(value2 % 1 === 0, `Number ${value2} is not an unsigned integer`);

                stack.push(value1, value2);
            }

            // Test the "unique-nes" of the generated numbers
            const uniqueStack = stack.filter((value, index, self) => index === self.indexOf(value));
            const stackLength = stack.length;
            const uniqueStackLength = uniqueStack.length;

            assert.equal(
                stackLength,
                uniqueStackLength,
                `From ${iterations} iterations there where ${stackLength - uniqueStackLength} duplicates`
            );
        });
    });

    describe('setSeed()', () => {
        it('results in different numbers if seed is changed from default', () => {
            const generator = aleaRNGFactory();
            const value1 = generator.uInt32();
            generator.setSeed(4);
            const value2 = generator.uInt32();

            assert.notEqual(value1, value2);
        });

        it('results in different numbers if seed is changed from defined', () => {
            const generator = aleaRNGFactory(1);
            const value1 = generator.uInt32();
            generator.setSeed(2);
            const value2 = generator.uInt32();

            assert.notEqual(value1, value2);
        });

        it('throws a TypeError on float seed value', () => {
            assert.throw(() => aleaRNGFactory(0.5), TypeError);
        });

        it('throws a TypeError on negative seed value', () => {
            assert.throw(() => aleaRNGFactory(-1), TypeError);
        });

        it('throws a TypeError on negative seed of 0', () => {
            assert.throw(() => aleaRNGFactory(0), TypeError);
        });
    });

    describe('getState()', () => {
        it('gets a representation of the internal state', () => {
            const generator = aleaRNGFactory(1);
            const state = generator.getState();

            assert.isDefined(state);
        });

        it('returns the correction', () => {
            const generator = aleaRNGFactory(2);
            const state = generator.getState();

            assert.equal(state.correction, 1);
        });

        it('returns all sequences', () => {
            const generator = aleaRNGFactory(3);
            const state = generator.getState();

            assert.lengthOf(state.sequence, 3);
        });

        it('returns the internal state with default settings', () => {
            const generator = aleaRNGFactory();
            const state = generator.getState();

            assert.equal(state.correction, 1);
            assert.isNumber(state.sequence[0]);
            assert.isNumber(state.sequence[1]);
            assert.isNumber(state.sequence[2]);
        });
    });

    describe('setState()', () => {
        it('creates default values if not all defined', () => {
            const generator = aleaRNGFactory();
            const state = {
                correction: 1,
                sequence: []
            };
            generator.setState(state);
            const internalState = generator.getState();

            assert.equal(internalState.correction, 1);
            assert.equal(internalState.sequence[0], 0);
            assert.equal(internalState.sequence[1], 0);
            assert.equal(internalState.sequence[2], 0);
        });

        it('ignores unused sequences', () => {
            const generator = aleaRNGFactory();
            const state = {
                correction: 1,
                sequence: [5, 4, 3, 2, 1, 0]
            };
            generator.setState(state);
            const internalState = generator.getState();

            assert.equal(internalState.correction, 1);
            assert.equal(internalState.sequence[0], 5);
            assert.equal(internalState.sequence[1], 4);
            assert.equal(internalState.sequence[2], 3);
            assert.lengthOf(internalState.sequence, 3);
        });

        it('restores the state on same instance if called without custom state', () => {
            const generator = aleaRNGFactory();
            generator.setState();
            const internalState = generator.getState();

            assert.equal(internalState.correction, 1);
            assert.equal(internalState.sequence[0], 0);
            assert.equal(internalState.sequence[1], 0);
            assert.equal(internalState.sequence[2], 0);
            assert.lengthOf(internalState.sequence, 3);
        });

        it('should reset the state if no state object is defined', () => {
            const generator = aleaRNGFactory();
            generator.uInt32();
            generator.uInt32();
            const state1 = generator.getState();
            const value1 = generator.uInt32();
            generator.uInt32();
            generator.uInt32();
            generator.setState(state1);
            const state2 = generator.getState();
            const value2 = generator.uInt32();

            assert.deepEqual(state1, state2);
            assert.equal(value1, value2);
        });

        it('should reset the state object is passed without "correction"', () => {
            const generator = aleaRNGFactory();
            const state = {
                sequence: [1, 2, 3]
            };
            generator.setState(state);
            const internalState = generator.getState();

            assert.equal(internalState.correction, 1);
            assert.equal(internalState.sequence[0], 1);
            assert.equal(internalState.sequence[1], 2);
            assert.equal(internalState.sequence[2], 3);
            assert.lengthOf(internalState.sequence, 3);
        });

        it('should reset the state object is passed without "sequence"', () => {
            const generator = aleaRNGFactory();
            const state = {
                correction: 5
            };
            generator.setState(state);
            const internalState = generator.getState();

            assert.equal(internalState.correction, 5);
            assert.equal(internalState.sequence[0], 0);
            assert.equal(internalState.sequence[1], 0);
            assert.equal(internalState.sequence[2], 0);
            assert.lengthOf(internalState.sequence, 3);
        });
    });
});

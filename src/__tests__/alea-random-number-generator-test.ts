import { assert } from 'chai';
import { INumberGenerator, aleaRNGFactory } from '../';

describe('aleaRNGFactory', () => {
    describe('uFloat32()', () => {
        it('should return an unsigned float number without explicit seed', () => {
            const generator: INumberGenerator = aleaRNGFactory();
            const value: number = generator.uFloat32();

            assert.isNumber(value, 'Value is not a number');
            assert.isAbove(value, 0, 'Number is not unsigned');
            assert.isAtMost(value, 1, 'Float is larger than 1, expected larger 0, smaller 1');
            assert.isTrue(value % 1 !== 0, `Number ${value} is not an unsigned float`);
        });

        it('returns multiple different numbers on repeated call', () => {
            const generator: INumberGenerator = aleaRNGFactory();
            const value1: number = generator.uFloat32();
            const value2: number = generator.uFloat32();
            const value3: number = generator.uFloat32();
            const value4: number = generator.uFloat32();

            assert.notEqual(value1, value2, 'First to second number are not unequal');
            assert.notEqual(value2, value3, 'Second to third number are not unequal');
            assert.notEqual(value3, value4, 'Third to fourth number are not unequal');
            assert.notEqual(value4, value1, 'Fourth to first number are not unequal');
        });

        it('produces a different result with seed', () => {
            const generator1: INumberGenerator = aleaRNGFactory(1);
            const value1: number = generator1.uFloat32();
            const generator2: INumberGenerator = aleaRNGFactory(2);
            const value2: number = generator2.uFloat32();

            assert.notEqual(value1, value2);
        });

        it('produces same result on new instance with default seed', () => {
            const generator1: INumberGenerator = aleaRNGFactory();
            const value1: number = generator1.uFloat32();
            const generator2: INumberGenerator = aleaRNGFactory();
            const value2: number = generator2.uFloat32();

            assert.equal(value1, value2);
        });

        it('produces same result on new instance with custom seed', () => {
            const generator1: INumberGenerator = aleaRNGFactory(1);
            const value1: number = generator1.uFloat32();
            const generator2: INumberGenerator = aleaRNGFactory(1);
            const value2: number = generator2.uFloat32();

            assert.equal(value1, value2);
        });

        it('[loop] should return unique valid uFloat32 after repeated calls', () => {
            const generator: INumberGenerator = aleaRNGFactory();
            const iterations: number = 100;
            const stack: number[] = [];

            for (let i: number = 1; i <= iterations; i++) {
                const value1: number = generator.uFloat32();
                const value2: number = generator.uFloat32();

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
            const uniqueStack: number[] = stack.filter(
                (value: number, index: number, self: number[]) => index === self.indexOf(value)
            );
            const stackLength: number = stack.length;
            const uniqueStackLength: number = uniqueStack.length;

            assert.equal(
                stackLength,
                uniqueStackLength,
                `From ${iterations} iterations there where ${stackLength - uniqueStackLength} duplicates`
            );
        });
    });

    describe('uInt32()', () => {
        it('should return a unsigned integer without explicit seed', () => {
            const generator: INumberGenerator = aleaRNGFactory();
            const value: number = generator.uInt32();

            assert.isNumber(value, 'Value is not a number');
            assert.isAbove(value, 1, 'Number is not an unsigned integer');
            assert.isTrue(value % 1 === 0, `Number ${value} is not an unsigned integer`);
        });

        it('returns multiple different numbers on repeated call', () => {
            const generator: INumberGenerator = aleaRNGFactory();
            const value1: number = generator.uInt32();
            const value2: number = generator.uInt32();
            const value3: number = generator.uInt32();
            const value4: number = generator.uInt32();

            assert.notEqual(value1, value2, 'First to second number are not unequal');
            assert.notEqual(value2, value3, 'Second to third number are not unequal');
            assert.notEqual(value3, value4, 'Third to fourth number are not unequal');
            assert.notEqual(value4, value1, 'Fourth to first number are not unequal');
        });

        it('produces a different result with seed', () => {
            const generator1: INumberGenerator = aleaRNGFactory(1);
            const value1: number = generator1.uInt32();
            const generator2: INumberGenerator = aleaRNGFactory(2);
            const value2: number = generator2.uInt32();

            assert.notEqual(value1, value2);
        });

        it('produces same result on new instance with default seed', () => {
            const generator1: INumberGenerator = aleaRNGFactory();
            const value1: number = generator1.uInt32();
            const generator2: INumberGenerator = aleaRNGFactory();
            const value2: number = generator2.uInt32();

            assert.equal(value1, value2);
        });

        it('produces same result on new instance with custom seed', () => {
            const generator1: INumberGenerator = aleaRNGFactory(1);
            const value1: number = generator1.uInt32();
            const generator2: INumberGenerator = aleaRNGFactory(1);
            const value2: number = generator2.uInt32();

            assert.equal(value1, value2);
        });

        it('[loop] should return unique valid uInt32 after repeated calls', () => {
            const generator: INumberGenerator = aleaRNGFactory();
            const iterations: number = 100;
            const stack: number[] = [];

            for (let i: number = 1; i <= iterations; i++) {
                const value1: number = generator.uInt32();
                const value2: number = generator.uInt32();

                assert.isNumber(value1, 'Value is not a number');
                assert.isAbove(value1, 1, 'Number is not an unsigned integer');
                assert.isTrue(value1 % 1 === 0, `Number ${value1} is not an unsigned integer`);

                assert.isNumber(value2, 'Value is not a number');
                assert.isAbove(value2, 1, 'Number is not an unsigned integer');
                assert.isTrue(value2 % 1 === 0, `Number ${value2} is not an unsigned integer`);

                stack.push(value1, value2);
            }

            // Test the "unique-nes" of the generated numbers
            const uniqueStack: number[] = stack.filter(
                (value: number, index: number, self: number[]) => index === self.indexOf(value)
            );
            const stackLength: number = stack.length;
            const uniqueStackLength: number = uniqueStack.length;

            assert.equal(
                stackLength,
                uniqueStackLength,
                `From ${iterations} iterations there where ${stackLength - uniqueStackLength} duplicates`
            );
        });
    });

    describe('setSeed()', () => {
        it('results in different numbers if seed is changed from default', () => {
            const generator: INumberGenerator = aleaRNGFactory();
            const value1: number = generator.uInt32();
            generator.setSeed(4);
            const value2: number = generator.uInt32();

            assert.notEqual(value1, value2);
        });

        it('results in different numbers if seed is changed from defined', () => {
            const generator: INumberGenerator = aleaRNGFactory(1);
            const value1: number = generator.uInt32();
            generator.setSeed(2);
            const value2: number = generator.uInt32();

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
});

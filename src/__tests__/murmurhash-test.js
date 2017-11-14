import { assert } from 'chai';
import { murmurHash } from '../';

describe('murmurHash()', () => {
    it('should generate an number hash by string', () => {
        const testString = 'Awkward code!';
        const hash = murmurHash(testString);

        assert.isNumber(hash, 'Value is not a number');
        assert.isAbove(hash, 1, 'Hash is larger than 1');
        assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);
    });

    it('should generate an number hash by string of length 1', () => {
        const testString = 'I';
        const hash = murmurHash(testString);

        assert.isNumber(hash, 'Value is not a number');
        assert.isAbove(hash, 1, 'Hash is larger than 1');
        assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);
    });

    it('should generate an number hash by string of length 2', () => {
        const testString = 'am';
        const hash = murmurHash(testString);

        assert.isNumber(hash, 'Value is not a number');
        assert.isAbove(hash, 1, 'Hash is larger than 1');
        assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);
    });

    it('should generate an number hash by string of length 3', () => {
        const testString = 'MHF';
        const hash = murmurHash(testString);

        assert.isNumber(hash, 'Value is not a number');
        assert.isAbove(hash, 1, 'Hash is larger than 1');
        assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);
    });

    it('returns zero on empty string', () => {
        const testString = '';
        const hash = murmurHash(testString);

        assert.isNumber(hash, 'Value is not a number');
        assert.equal(hash, 0, 'Number is not unsigned');
    });

    it('produces a different hash with same string but different seed', () => {
        const testString = 'Awkward code!';
        const hash1 = murmurHash(testString, 1);
        const hash2 = murmurHash(testString, 2);

        assert.notEqual(hash1, hash2);
    });

    it('produces the same hash with same string and seed', () => {
        const testString = 'Awkward code!';
        const hash1 = murmurHash(testString, 1);
        const hash2 = murmurHash(testString, 1);
        const hash3 = murmurHash(testString, 1);
        const hash4 = murmurHash(testString, 1);

        assert.equal(hash1, hash2);
        assert.equal(hash3, hash4);
        assert.equal(hash4, hash1);
    });

    it('should return a valid result if seed is 0', () => {
        const testString = 'Awkward code!';
        const hash = murmurHash(testString, 0);

        assert.isNumber(hash, 'Value is not a number');
        assert.isAbove(hash, 1, 'Hash is larger than 1');
        assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);
    });

    it('should return a valid result on negative seed', () => {
        const testString = 'Awkward code!';
        const hash = murmurHash(testString, -10);

        assert.isNumber(hash, 'Value is not a number');
        assert.isAbove(hash, 1, 'Hash is larger than 1');
        assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);
    });

    it('throws a TypeError on float seed value', () => {
        assert.throw(() => murmurHash('', 0.2), TypeError);
    });

    it('[loop] should produce unique results on unsigned seeds', () => {
        const iterations = 100;
        const stack = [];

        for (let i = 0; i <= iterations; i++) {
            const hash = murmurHash('Awkward code!', i);

            assert.isNumber(hash, 'Value is not a number');
            assert.isAbove(hash, 1, 'Hash is larger than 1');
            assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);

            stack.push(hash);
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

    it('[loop] should produce unique results on seed range from negative to positive', () => {
        const iterations = 100;
        const stack = [];

        for (let i = -100; i <= iterations; i++) {
            const hash = murmurHash('Awkward code!', i);

            assert.isNumber(hash, 'Value is not a number');
            assert.isAbove(hash, 1, 'Hash is larger than 1');
            assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);

            stack.push(hash);
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

import { assert } from 'chai';
import { murmurHash } from '../';

describe('murmurHash()', () => {
    it('should generate an number hash by string', () => {
        const testString: string = 'Awkward code!';
        const hash: number = murmurHash(testString);

        assert.isNumber(hash, 'Value is not a number');
        assert.isAbove(hash, 1, 'Hash is larger than 1');
        assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);
    });

    it('should generate an number hash by string of length 1', () => {
        const testString: string = 'I';
        const hash: number = murmurHash(testString);

        assert.isNumber(hash, 'Value is not a number');
        assert.isAbove(hash, 1, 'Hash is larger than 1');
        assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);
    });

    it('should generate an number hash by string of length 2', () => {
        const testString: string = 'am';
        const hash: number = murmurHash(testString);

        assert.isNumber(hash, 'Value is not a number');
        assert.isAbove(hash, 1, 'Hash is larger than 1');
        assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);
    });

    it('should generate an number hash by string of length 3', () => {
        const testString: string = 'MHF';
        const hash: number = murmurHash(testString);

        assert.isNumber(hash, 'Value is not a number');
        assert.isAbove(hash, 1, 'Hash is larger than 1');
        assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);
    });

    it('returns zero on empty string', () => {
        const testString: string = '';
        const hash: number = murmurHash(testString);

        assert.isNumber(hash, 'Value is not a number');
        assert.equal(hash, 0, 'Number is not unsigned');
    });

    it('produces a different hash with same string but different seed', () => {
        const testString: string = 'Awkward code!';
        const hash1: number = murmurHash(testString, 1);
        const hash2: number = murmurHash(testString, 2);

        assert.notEqual(hash1, hash2);
    });

    it('produces the same hash with same string and seed', () => {
        const testString: string = 'Awkward code!';
        const hash1: number = murmurHash(testString, 1);
        const hash2: number = murmurHash(testString, 1);
        const hash3: number = murmurHash(testString, 1);
        const hash4: number = murmurHash(testString, 1);

        assert.equal(hash1, hash2);
        assert.equal(hash3, hash4);
        assert.equal(hash4, hash1);
    });

    it('should return a valid result if seed is 0', () => {
        const testString: string = 'Awkward code!';
        const hash: number = murmurHash(testString, 0);

        assert.isNumber(hash, 'Value is not a number');
        assert.isAbove(hash, 1, 'Hash is larger than 1');
        assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);
    });

    it('should return a valid result on negative seed', () => {
        const testString: string = 'Awkward code!';
        const hash: number = murmurHash(testString, -10);

        assert.isNumber(hash, 'Value is not a number');
        assert.isAbove(hash, 1, 'Hash is larger than 1');
        assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);
    });

    it('throws a TypeError on float seed value', () => {
        assert.throw(() => murmurHash('', 0.2), TypeError);
    });

    it('[loop] should produce unique results on unsigned seeds', () => {
        const iterations: number = 100;
        const stack: number[] = [];

        for (let i: number = 0; i <= iterations; i++) {
            const hash: number = murmurHash('Awkward code!', i);

            assert.isNumber(hash, 'Value is not a number');
            assert.isAbove(hash, 1, 'Hash is larger than 1');
            assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);

            stack.push(hash);
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

    it('[loop] should produce unique results on seed range from negative to positive', () => {
        const iterations: number = 100;
        const stack: number[] = [];

        for (let i: number = -100; i <= iterations; i++) {
            const hash: number = murmurHash('Awkward code!', i);

            assert.isNumber(hash, 'Value is not a number');
            assert.isAbove(hash, 1, 'Hash is larger than 1');
            assert.isTrue(hash % 1 === 0, `Hash ${hash} is not an unsigned integer`);

            stack.push(hash);
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

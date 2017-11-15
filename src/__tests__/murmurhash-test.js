import { murmurHash } from '../';

describe('murmurHash()', () => {
    test('should generate an number hash by string', () => {
        const testString = 'Awkward code!';
        const hash = murmurHash(testString);

        expect(hash).toBeGreaterThan(1);
        expect(hash % 1 === 0).toBeTruthy();
    });

    test('should generate an number hash by string of length 1', () => {
        const testString = 'I';
        const hash = murmurHash(testString);

        expect(hash).toBeGreaterThan(1);
        expect(hash % 1 === 0).toBeTruthy();
    });

    test('should generate an number hash by string of length 2', () => {
        const testString = 'am';
        const hash = murmurHash(testString);

        expect(hash).toBeGreaterThan(1);
        expect(hash % 1 === 0).toBeTruthy();
    });

    test('should generate an number hash by string of length 3', () => {
        const testString = 'MHF';
        const hash = murmurHash(testString);

        expect(hash).toBeGreaterThan(1);
        expect(hash % 1 === 0).toBeTruthy();
    });

    test('returns zero on empty string', () => {
        const testString = '';
        const hash = murmurHash(testString);

        expect(hash).toBe(0);
    });

    test('produces a different hash with same string but different seed', () => {
        const testString = 'Awkward code!';
        const hash1 = murmurHash(testString, 1);
        const hash2 = murmurHash(testString, 2);

        expect(hash1).not.toEqual(hash2);
    });

    test('produces the same hash with same string and seed', () => {
        const testString = 'Awkward code!';
        const hash1 = murmurHash(testString, 1);
        const hash2 = murmurHash(testString, 1);
        const hash3 = murmurHash(testString, 1);
        const hash4 = murmurHash(testString, 1);

        expect(hash1).toBe(hash2);
        expect(hash3).toBe(hash4);
        expect(hash4).toBe(hash1);
    });

    test('should return a valid result if seed is 0', () => {
        const testString = 'Awkward code!';
        const hash = murmurHash(testString, 0);

        expect(hash).toBeGreaterThan(1);
        expect(hash % 1 === 0).toBeTruthy();
    });

    test('should return a valid result on negative seed', () => {
        const testString = 'Awkward code!';
        const hash = murmurHash(testString, -10);

        expect(hash).toBeGreaterThan(1);
        expect(hash % 1 === 0).toBeTruthy();
    });

    test('throws a TypeError on float seed value', () => {
        expect(() => murmurHash('', 0.2)).toThrowError(TypeError);
    });

    test('[loop] should produce unique results on unsigned seeds', () => {
        const iterations = 100;
        const stack = [];

        for (let i = 0; i <= iterations; i++) {
            const hash = murmurHash('Awkward code!', i);

            expect(hash).toBeGreaterThan(1);
            expect(hash % 1 === 0).toBeTruthy();

            stack.push(hash);
        }

        // Test the "unique-nes" of the generated numbers
        const uniqueStack = stack.filter(
            (value, index, self) => index === self.indexOf(value)
        );

        expect(stack).toHaveLength(uniqueStack.length);
    });

    test('[loop] should produce unique results on seed range from negative to positive', () => {
        const iterations = 100;
        const stack = [];

        for (let i = -100; i <= iterations; i++) {
            const hash = murmurHash('Awkward code!', i);

            expect(hash).toBeGreaterThan(1);
            expect(hash % 1 === 0).toBeTruthy();

            stack.push(hash);
        }

        // Test the "unique-nes" of the generated numbers
        const uniqueStack = stack.filter(
            (value, index, self) => index === self.indexOf(value)
        );

        expect(stack).toHaveLength(uniqueStack.length);
    });
});

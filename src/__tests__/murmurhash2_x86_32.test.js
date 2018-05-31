import { requireFunction } from './helper';

const murmurhash2_x86_32 = requireFunction('murmurhash2_x86_32');

describe('murmurhash2_x86_32()', () => {
    test('should generate an number hash by string', () => {
        const testString = 'Awkward code!';
        const hash = murmurhash2_x86_32(testString);

        expect(hash).toBeGreaterThan(1);
        expect(hash % 1 === 0).toBeTruthy();
    });

    test('should generate an number hash by string of length 1', () => {
        const testString = 'I';
        const hash = murmurhash2_x86_32(testString);

        expect(hash).toBeGreaterThan(1);
        expect(hash % 1 === 0).toBeTruthy();
    });

    test('should generate an number hash by string of length 2', () => {
        const testString = 'am';
        const hash = murmurhash2_x86_32(testString);

        expect(hash).toBeGreaterThan(1);
        expect(hash % 1 === 0).toBeTruthy();
    });

    test('should generate an number hash by string of length 3', () => {
        const testString = 'MHF';
        const hash = murmurhash2_x86_32(testString);

        expect(hash).toBeGreaterThan(1);
        expect(hash % 1 === 0).toBeTruthy();
    });

    test('returns zero on empty string', () => {
        const testString = '';
        const hash = murmurhash2_x86_32(testString);

        expect(hash).toBe(0);
    });

    test('produces a different hash with same string but different seed', () => {
        const testString = 'Awkward code!';
        const hash1 = murmurhash2_x86_32(testString, 1);
        const hash2 = murmurhash2_x86_32(testString, 2);

        expect(hash1).not.toEqual(hash2);
    });

    test('produces the same hash with same string and seed', () => {
        const testString = 'Awkward code!';
        const hash1 = murmurhash2_x86_32(testString, 1);
        const hash2 = murmurhash2_x86_32(testString, 1);
        const hash3 = murmurhash2_x86_32(testString, 1);
        const hash4 = murmurhash2_x86_32(testString, 1);

        expect(hash1).toBe(hash2);
        expect(hash3).toBe(hash4);
        expect(hash4).toBe(hash1);
    });

    test('should return a valid result if seed is 0', () => {
        const testString = 'Awkward code!';
        const hash = murmurhash2_x86_32(testString, 0);

        expect(hash).toBeGreaterThan(1);
        expect(hash % 1 === 0).toBeTruthy();
    });

    test('should return a valid result on negative seed', () => {
        const testString = 'Awkward code!';
        const hash = murmurhash2_x86_32(testString, -10);

        expect(hash).toBeGreaterThan(1);
        expect(hash % 1 === 0).toBeTruthy();
    });

    test('throws a TypeError on float seed value', () => {
        expect(() => murmurhash2_x86_32('', 0.2)).toThrowError(TypeError);
    });

    test('[loop] should produce unique results on unsigned seeds', () => {
        const iterations = 100;
        const stack = [];

        for (let i = 0; i <= iterations; i++) {
            const hash = murmurhash2_x86_32('Awkward code!', i);

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
            const hash = murmurhash2_x86_32('Awkward code!', i);

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

    test('produces an exact reproducible hash (like defined in other implementations)', () => {
        const hash1 = murmurhash2_x86_32('string', 0);
        const hash2 = murmurhash2_x86_32('string', 13);
        const hash3 = murmurhash2_x86_32('something', 5);
        expect(hash1).toBe(1640947696);
        expect(hash2).toBe(485409088);
        expect(hash3).toBe(4098796303);
    });

    test('do not return 0 for strings length multiply of 4', () => {
        const hash1 = murmurhash2_x86_32('A');
        const hash2 = murmurhash2_x86_32('AA');
        const hash3 = murmurhash2_x86_32('AAA');
        const hash4 = murmurhash2_x86_32('AAAA');
        const hash5 = murmurhash2_x86_32('AAAAA');
        const hash6 = murmurhash2_x86_32('AAAAAA');
        const hash7 = murmurhash2_x86_32('AAAAAAA');
        const hash8 = murmurhash2_x86_32('AAAAAAAA');
        const hash9 = murmurhash2_x86_32('AAAAAAAAAAAA');

        expect(hash1).toBe(636687721);
        expect(hash2).toBe(3621601297);
        expect(hash3).toBe(2474210034);
        expect(hash4).toBe(1480750041);
        expect(hash5).toBe(2462844500);
        expect(hash6).toBe(263112632);
        expect(hash7).toBe(433066591);
        expect(hash8).toBe(586671992);
        expect(hash9).toBe(285004715);
    });
});

import { aleaRNGFactory } from '../';

describe('aleaRNGFactory', () => {
    describe('uFloat32()', () => {
        test('should return an unsigned float number without explicit seed', () => {
            const generator = aleaRNGFactory();
            const value = generator.uFloat32();

            expect(value).toBeGreaterThan(0);
            expect(value).toBeLessThan(1);
            expect(value % 1 !== 0).toBeTruthy();
        });

        test('returns multiple different numbers on repeated call', () => {
            const generator = aleaRNGFactory();
            const value1 = generator.uFloat32();
            const value2 = generator.uFloat32();
            const value3 = generator.uFloat32();
            const value4 = generator.uFloat32();

            expect(value1).not.toEqual(value2);
            expect(value2).not.toEqual(value3);
            expect(value3).not.toEqual(value4);
            expect(value4).not.toEqual(value1);
        });

        test('produces a different result with seed', () => {
            const generator1 = aleaRNGFactory(1);
            const value1 = generator1.uFloat32();
            const generator2 = aleaRNGFactory(2);
            const value2 = generator2.uFloat32();

            expect(value1).not.toEqual(value2);
        });

        test('produces same result on new instance with default seed', () => {
            const generator1 = aleaRNGFactory();
            const value1 = generator1.uFloat32();
            const generator2 = aleaRNGFactory();
            const value2 = generator2.uFloat32();

            expect(value1).toBe(value2);
        });

        it('produces same result on new instance with custom seed', () => {
            const generator1 = aleaRNGFactory(1);
            const value1 = generator1.uFloat32();
            const generator2 = aleaRNGFactory(1);
            const value2 = generator2.uFloat32();

            expect(value1).toBe(value2);
        });

        test('[loop] should return unique valid uFloat32 after repeated calls', () => {
            const generator = aleaRNGFactory();
            const iterations = 100;
            const stack = [];

            for (let i = 1; i <= iterations; i++) {
                const value1 = generator.uFloat32();
                const value2 = generator.uFloat32();

                expect(value1).toBeGreaterThan(0);
                expect(value1).toBeLessThan(1);
                expect(value1 % 1 !== 0).toBeTruthy();

                expect(value2).toBeGreaterThan(0);
                expect(value2).toBeLessThan(1);
                expect(value2 % 1 !== 0);

                stack.push(value1, value2);
            }

            // Test the "unique-nes" of the generated numbers
            const uniqueStack = stack.filter(
                (value, index, self) => index === self.indexOf(value)
            );

            expect(stack).toHaveLength(uniqueStack.length);
        });
    });

    describe('uInt32()', () => {
        test('should return a unsigned integer without explicit seed', () => {
            const generator = aleaRNGFactory();
            const value = generator.uInt32();

            expect(value).toBeGreaterThan(1);
            expect(value % 1 === 0).toBeTruthy();
        });

        test('returns multiple different numbers on repeated call', () => {
            const generator = aleaRNGFactory();
            const value1 = generator.uInt32();
            const value2 = generator.uInt32();
            const value3 = generator.uInt32();
            const value4 = generator.uInt32();

            expect(value1).not.toEqual(value2);
            expect(value2).not.toEqual(value3);
            expect(value3).not.toEqual(value4);
            expect(value4).not.toEqual(value1);
        });

        test('produces a different result with seed', () => {
            const generator1 = aleaRNGFactory(1);
            const value1 = generator1.uInt32();
            const generator2 = aleaRNGFactory(2);
            const value2 = generator2.uInt32();

            expect(value1).not.toEqual(value2);
        });

        test('produces same result on new instance with default seed', () => {
            const generator1 = aleaRNGFactory();
            const value1 = generator1.uInt32();
            const generator2 = aleaRNGFactory();
            const value2 = generator2.uInt32();

            expect(value1).toBe(value2);
        });

        test('produces same result on new instance with custom seed', () => {
            const generator1 = aleaRNGFactory(1);
            const value1 = generator1.uInt32();
            const generator2 = aleaRNGFactory(1);
            const value2 = generator2.uInt32();

            expect(value1).toBe(value2);
        });

        test('[loop] should return unique valid uInt32 after repeated calls', () => {
            const generator = aleaRNGFactory();
            const iterations = 100;
            const stack = [];

            for (let i = 1; i <= iterations; i++) {
                const value1 = generator.uInt32();
                const value2 = generator.uInt32();

                expect(value1).toBeGreaterThan(1);
                expect(value1 % 1 === 0).toBeTruthy();

                expect(value2).toBeGreaterThan(1);
                expect(value2 % 1 === 0).toBeTruthy();

                stack.push(value1, value2);
            }

            // Test the "unique-nes" of the generated numbers
            const uniqueStack = stack.filter(
                (value, index, self) => index === self.indexOf(value)
            );

            expect(stack).toHaveLength(uniqueStack.length);
        });
    });

    describe('setSeed()', () => {
        test('results in different numbers if seed is changed from default', () => {
            const generator = aleaRNGFactory();
            const value1 = generator.uInt32();
            generator.setSeed(4);
            const value2 = generator.uInt32();

            expect(value1).not.toEqual(value2);
        });

        test('results in different numbers if seed is changed from defined', () => {
            const generator = aleaRNGFactory(1);
            const value1 = generator.uInt32();
            generator.setSeed(2);
            const value2 = generator.uInt32();

            expect(value1).not.toEqual(value2);
        });

        test('throws a TypeError on float seed value', () => {
            expect(() => aleaRNGFactory(0.5)).toThrowError(TypeError);
        });

        test('throws a TypeError on negative seed value', () => {
            expect(() => aleaRNGFactory(-1)).toThrowError(TypeError);
        });

        test('throws a TypeError on negative seed of 0', () => {
            expect(() => aleaRNGFactory(0)).toThrowError(TypeError);
        });
    });

    describe('getState()', () => {
        test('gets a representation of the internal state', () => {
            const generator = aleaRNGFactory(1);
            const state = generator.getState();

            expect(state).toBeDefined();
        });

        test('returns the correction', () => {
            const generator = aleaRNGFactory(2);
            const state = generator.getState();

            expect(state.correction).toBe(1);
        });

        test('returns all sequences', () => {
            const generator = aleaRNGFactory(3);
            const state = generator.getState();

            expect(state.sequence).toHaveLength(3);
        });

        test('returns the internal state with default settings', () => {
            const generator = aleaRNGFactory();
            const state = generator.getState();

            expect(state.correction).toBe(1);
            expect(state.sequence[0]).toBeDefined();
            expect(state.sequence[1]).toBeDefined();
            expect(state.sequence[2]).toBeDefined();
        });
    });

    describe('setState()', () => {
        test('creates default values if not all defined', () => {
            const generator = aleaRNGFactory();
            const state = {
                correction: 1,
                sequence: []
            };
            generator.setState(state);
            const internalState = generator.getState();

            expect(internalState.correction).toBe(1);
            expect(internalState.sequence[0]).toBe(0);
            expect(internalState.sequence[1]).toBe(0);
            expect(internalState.sequence[2]).toBe(0);
        });

        test('ignores unused sequences', () => {
            const generator = aleaRNGFactory();
            const state = {
                correction: 1,
                sequence: [5, 4, 3, 2, 1, 0]
            };
            generator.setState(state);
            const internalState = generator.getState();

            expect(internalState.correction).toBe(1);
            expect(internalState.sequence[0]).toBe(5);
            expect(internalState.sequence[1]).toBe(4);
            expect(internalState.sequence[2]).toBe(3);
            expect(internalState.sequence).toHaveLength(3);
        });

        test('restores the state on same instance if called without custom state', () => {
            const generator = aleaRNGFactory();
            generator.setState();
            const internalState = generator.getState();

            expect(internalState.correction).toBe(1);
            expect(internalState.sequence[0]).toBe(0);
            expect(internalState.sequence[1]).toBe(0);
            expect(internalState.sequence[2]).toBe(0);
            expect(internalState.sequence).toHaveLength(3);
        });

        test('should reset the state if no state object is defined', () => {
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

            expect(state1).toEqual(state2);
            expect(value1).toBe(value2);
        });

        test('should reset the state object is passed without "correction"', () => {
            const generator = aleaRNGFactory();
            const state = {
                sequence: [1, 2, 3]
            };
            generator.setState(state);
            const internalState = generator.getState();

            expect(internalState.correction).toBe(1);
            expect(internalState.sequence[0]).toBe(1);
            expect(internalState.sequence[1]).toBe(2);
            expect(internalState.sequence[2]).toBe(3);
            expect(internalState.sequence).toHaveLength(3);
        });

        test('should reset the state object is passed without "sequence"', () => {
            const generator = aleaRNGFactory();
            const state = {
                correction: 5
            };
            generator.setState(state);
            const internalState = generator.getState();

            expect(internalState.correction).toBe(5);
            expect(internalState.sequence[0]).toBe(0);
            expect(internalState.sequence[1]).toBe(0);
            expect(internalState.sequence[2]).toBe(0);
            expect(internalState.sequence).toHaveLength(3);
        });
    });
});

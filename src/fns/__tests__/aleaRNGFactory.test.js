import { assert } from "chai";
import { requireFunction } from "./helper";

const aleaRNGFactory = requireFunction("aleaRNGFactory");

describe("aleaRNGFactory", () => {
  describe("uFloat32()", () => {
    it("should return an unsigned float number without explicit seed", () => {
      const generator = aleaRNGFactory();
      const value = generator.uFloat32();

      assert.isAbove(value, 0);
      assert.isBelow(value, 1);
      assert.isTrue(value % 1 !== 0);
    });

    it("returns multiple different numbers on repeated call", () => {
      const generator = aleaRNGFactory();
      const value1 = generator.uFloat32();
      const value2 = generator.uFloat32();
      const value3 = generator.uFloat32();
      const value4 = generator.uFloat32();

      assert.notStrictEqual(value1, value2);
      assert.notStrictEqual(value2, value3);
      assert.notStrictEqual(value3, value4);
      assert.notStrictEqual(value4, value1);
    });

    it("produces a different result with seed", () => {
      const generator1 = aleaRNGFactory(1);
      const value1 = generator1.uFloat32();
      const generator2 = aleaRNGFactory(2);
      const value2 = generator2.uFloat32();

      assert.notStrictEqual(value1, value2);
    });

    it("produces same result on new instance with default seed", () => {
      const generator1 = aleaRNGFactory();
      const value1 = generator1.uFloat32();
      const generator2 = aleaRNGFactory();
      const value2 = generator2.uFloat32();

      assert.strictEqual(value1, value2);
    });

    it("produces same result on new instance with custom seed", () => {
      const generator1 = aleaRNGFactory(1);
      const value1 = generator1.uFloat32();
      const generator2 = aleaRNGFactory(1);
      const value2 = generator2.uFloat32();

      assert.strictEqual(value1, value2);
    });

    it("[loop] should return unique valid uFloat32 after repeated calls", () => {
      const generator = aleaRNGFactory();
      const iterations = 1000;
      const stack = [];

      for (let i = 1; i <= iterations; i++) {
        const value1 = generator.uFloat32();
        const value2 = generator.uFloat32();

        assert.isAbove(value1, 0);
        assert.isBelow(value1, 1);
        assert.isTrue(value1 % 1 !== 0);

        assert.isAbove(value2, 0);
        assert.isBelow(value2, 1);
        assert.isTrue(value2 % 1 !== 0);

        stack.push(value1, value2);
      }

      // Test the "unique-nes" of the generated numbers
      const uniqueStack = stack.filter(
        (value, index, self) => index === self.indexOf(value)
      );

      assert.lengthOf(
        stack,
        uniqueStack.length,
        `There is/are ${stack.length -
          uniqueStack.length} duplicate(s) after ${iterations} iterations.`
      );
    });

    it("produces the exact same results (like defined in other implementations)", () => {
      const { uFloat32 } = aleaRNGFactory();
      assert.strictEqual(uFloat32(), 0.00048699788749217987);
      assert.strictEqual(uFloat32(), 0.6369280074723065);
      assert.strictEqual(uFloat32(), 0.9810351100750268);
      assert.strictEqual(uFloat32(), 0.6238283265847713);
    });

    it("tests in the readme used examples", () => {
      const { uFloat32 } = aleaRNGFactory(5);
      assert.strictEqual(uFloat32(), 0.0024349885061383247);
      assert.strictEqual(uFloat32(), 0.1826920467428863);
    });
  });

  describe("uInt32()", () => {
    it("should return a unsigned integer without explicit seed", () => {
      const generator = aleaRNGFactory();
      const value = generator.uInt32();

      assert.isAbove(value, 1);
      assert.isTrue(value % 1 === 0);
    });

    it("returns multiple different numbers on repeated call", () => {
      const generator = aleaRNGFactory();
      const value1 = generator.uInt32();
      const value2 = generator.uInt32();
      const value3 = generator.uInt32();
      const value4 = generator.uInt32();

      assert.notStrictEqual(value1, value2);
      assert.notStrictEqual(value2, value3);
      assert.notStrictEqual(value3, value4);
      assert.notStrictEqual(value4, value1);
    });

    it("produces a different result with seed", () => {
      const generator1 = aleaRNGFactory(1);
      const value1 = generator1.uInt32();
      const generator2 = aleaRNGFactory(2);
      const value2 = generator2.uInt32();

      assert.notStrictEqual(value1, value2);
    });

    it("produces same result on new instance with default seed", () => {
      const generator1 = aleaRNGFactory();
      const value1 = generator1.uInt32();
      const generator2 = aleaRNGFactory();
      const value2 = generator2.uInt32();

      assert.strictEqual(value1, value2);
    });

    it("produces same result on new instance with custom seed", () => {
      const generator1 = aleaRNGFactory(1);
      const value1 = generator1.uInt32();
      const generator2 = aleaRNGFactory(1);
      const value2 = generator2.uInt32();

      assert.strictEqual(value1, value2);
    });

    it("[loop] should return unique valid uInt32 after repeated calls", () => {
      const generator = aleaRNGFactory();
      const iterations = 1000;
      const stack = [];

      for (let i = 1; i <= iterations; i++) {
        const value1 = generator.uInt32();
        const value2 = generator.uInt32();

        assert.isAbove(value1, 1);
        assert.isTrue(value1 % 1 === 0);

        assert.isAbove(value2, 1);
        assert.isTrue(value2 % 1 === 0);

        stack.push(value1, value2);
      }

      // Test the "unique-nes" of the generated numbers
      const uniqueStack = stack.filter(
        (value, index, self) => index === self.indexOf(value)
      );

      assert.lengthOf(
        stack,
        uniqueStack.length,
        `There is/are ${stack.length -
          uniqueStack.length} duplicate(s) after ${iterations} iterations.`
      );
    });

    it("produces the exact same results (like defined in other implementations)", () => {
      const { uInt32 } = aleaRNGFactory();
      assert.strictEqual(uInt32(), 2091640);
      assert.strictEqual(uInt32(), 2735584962);
      assert.strictEqual(uInt32(), 4213513714);
      assert.strictEqual(uInt32(), 2679322261);
    });

    it("tests in the readme used examples", () => {
      const { uInt32 } = aleaRNGFactory(10);
      assert.strictEqual(uInt32(), 20916391);
      assert.strictEqual(uInt32(), 1567221093);
    });
  });

  describe("setSeed()", () => {
    it("results in different numbers if seed is changed from default", () => {
      const generator = aleaRNGFactory();
      const value1 = generator.uInt32();
      generator.setSeed(4);
      const value2 = generator.uInt32();

      assert.notStrictEqual(value1, value2);
    });

    it("results in different numbers if seed is changed from defined", () => {
      const generator = aleaRNGFactory(1);
      const value1 = generator.uInt32();
      generator.setSeed(2);
      const value2 = generator.uInt32();

      assert.notStrictEqual(value1, value2);
    });

    it("throws a TypeError on float seed value", () => {
      assert.throws(() => aleaRNGFactory(0.5), TypeError);
    });

    it("throws a TypeError on negative seed value", () => {
      assert.throws(() => aleaRNGFactory(-1), TypeError);
    });

    it("throws a TypeError on negative seed of 0", () => {
      assert.throws(() => aleaRNGFactory(0), TypeError);
    });
  });

  describe("getState()", () => {
    it("gets a representation of the internal state", () => {
      const generator = aleaRNGFactory(1);
      const state = generator.getState();

      assert.isDefined(state);
    });

    it("returns the correction", () => {
      const generator = aleaRNGFactory(2);
      const state = generator.getState();

      assert.strictEqual(state.correction, 1);
    });

    it("returns all sequences", () => {
      const generator = aleaRNGFactory(3);
      const state = generator.getState();

      assert.lengthOf(state.sequence, 3);
    });

    it("returns the internal state with default settings", () => {
      const generator = aleaRNGFactory();
      const state = generator.getState();

      assert.strictEqual(state.correction, 1);
      assert.isDefined(state.sequence[0]);
      assert.isDefined(state.sequence[1]);
      assert.isDefined(state.sequence[2]);
    });
  });

  describe("setState()", () => {
    it("creates default values if not all defined", () => {
      const generator = aleaRNGFactory();
      const state = {
        correction: 1,
        sequence: []
      };
      generator.setState(state);
      const internalState = generator.getState();

      assert.strictEqual(internalState.correction, 1);
      assert.strictEqual(internalState.sequence[0], 0);
      assert.strictEqual(internalState.sequence[1], 0);
      assert.strictEqual(internalState.sequence[2], 0);
    });

    it("ignores unused sequences", () => {
      const generator = aleaRNGFactory();
      const state = {
        correction: 1,
        sequence: [5, 4, 3, 2, 1, 0]
      };
      generator.setState(state);
      const internalState = generator.getState();

      assert.strictEqual(internalState.correction, 1);
      assert.strictEqual(internalState.sequence[0], 5);
      assert.strictEqual(internalState.sequence[1], 4);
      assert.strictEqual(internalState.sequence[2], 3);
      assert.lengthOf(internalState.sequence, 3);
    });

    it("restores the state on same instance if called without custom state", () => {
      const generator = aleaRNGFactory();
      generator.setState();
      const internalState = generator.getState();

      assert.strictEqual(internalState.correction, 1);
      assert.strictEqual(internalState.sequence[0], 0);
      assert.strictEqual(internalState.sequence[1], 0);
      assert.strictEqual(internalState.sequence[2], 0);
      assert.lengthOf(internalState.sequence, 3);
    });

    it("should reset the state if no state object is defined", () => {
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
      assert.strictEqual(value1, value2);
    });

    it('should reset the state object is passed without "correction"', () => {
      const generator = aleaRNGFactory();
      const state = {
        sequence: [1, 2, 3]
      };
      generator.setState(state);
      const internalState = generator.getState();

      assert.strictEqual(internalState.correction, 1);
      assert.strictEqual(internalState.sequence[0], 1);
      assert.strictEqual(internalState.sequence[1], 2);
      assert.strictEqual(internalState.sequence[2], 3);
      assert.lengthOf(internalState.sequence, 3);
    });

    it('should reset the state object is passed without "sequence"', () => {
      const generator = aleaRNGFactory();
      const state = {
        correction: 5
      };
      generator.setState(state);
      const internalState = generator.getState();

      assert.strictEqual(internalState.correction, 5);
      assert.strictEqual(internalState.sequence[0], 0);
      assert.strictEqual(internalState.sequence[1], 0);
      assert.strictEqual(internalState.sequence[2], 0);
      assert.lengthOf(internalState.sequence, 3);
    });
  });
});

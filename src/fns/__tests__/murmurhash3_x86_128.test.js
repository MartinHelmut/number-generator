import { assert } from "chai";
import { requireFunction } from "./helper";

const murmurhash3_x86_128 = requireFunction("murmurhash3_x86_128");

describe("murmurhash3_x86_128()", function() {
  // Specifically for [loop] tests this needs to be higher to execute the 10.000
  // executions of the `murmurhash3_x86_128` function.
  this.timeout(3000);

  it("should throw a TypeError if no hash is passed", () => {
    assert.throws(
      () => murmurhash3_x86_128(),
      TypeError,
      "murmurhash3_x86_128(): first argument is not a string."
    );
  });

  it("should throw a TypeError if no string as hash is passed", () => {
    assert.throws(
      () => murmurhash3_x86_128(true),
      TypeError,
      "murmurhash3_x86_128(): first argument is not a string."
    );
  });

  it("returns zero on empty string", () => {
    const testString = "";
    const hash = murmurhash3_x86_128(testString);

    assert.strictEqual(hash, "00000000000000000000000000000000");
  });

  it("should generate a 128 bit hash by string", () => {
    const testString = "Awkward code!";
    const hash = murmurhash3_x86_128(testString);

    assert.strictEqual(hash, "d3a4b65262ffbba9fac252e832386317");
  });

  it("should generate a 128 bit hash by string of length 1", () => {
    const testString = "a";
    const hash = murmurhash3_x86_128(testString);

    assert.strictEqual(hash, "a794933c5556b01b5556b01b5556b01b");
  });

  it("should generate a 128 bit hash by string of length 2", () => {
    const testString = "ab";
    const hash = murmurhash3_x86_128(testString);

    assert.strictEqual(hash, "158451df25be301025be301025be3010");
  });

  it("should generate a 128 bit hash by string of length 3", () => {
    const testString = "abc";
    const hash = murmurhash3_x86_128(testString);

    assert.strictEqual(hash, "75cdc6d1a2b006a5a2b006a5a2b006a5");
  });

  it("produces a different hash with same string but different seed", () => {
    const testString = "This is awesome!";
    const hash1 = murmurhash3_x86_128(testString, 1);
    const hash2 = murmurhash3_x86_128(testString, 2);

    assert.notStrictEqual(hash1, hash2);
  });

  it("produces the same hash with same string and seed", () => {
    const testString = "This is awesome!";
    const hash1 = murmurhash3_x86_128(testString, 1);
    const hash2 = murmurhash3_x86_128(testString, 1);
    const hash3 = murmurhash3_x86_128(testString, 1);
    const hash4 = murmurhash3_x86_128(testString, 1);

    assert.strictEqual(hash1, hash2);
    assert.strictEqual(hash3, hash4);
    assert.strictEqual(hash4, hash1);
  });

  it("should return a valid result if seed is 0", () => {
    const testString = "This is awesome!";
    const hash = murmurhash3_x86_128(testString, 0);

    assert.strictEqual(hash, "3efab6d2bc4313bb5a0174786218515b");
  });

  it("should return a valid result on negative seed", () => {
    const testString = "This is awesome!";
    const hash = murmurhash3_x86_128(testString, -10);

    assert.strictEqual(hash, "cc7d210d8b66676026648e74f44f2d01");
  });

  it("throws a TypeError on float seed value", () => {
    assert.throws(() => murmurhash3_x86_128("", 0.2), TypeError);
  });

  it("[loop] should produce unique results on unsigned seeds", () => {
    const iterations = 10000;
    const stack = [];

    for (let i = 0; i <= iterations; i++) {
      const hash = murmurhash3_x86_128("This is awesome!", i);

      assert.lengthOf(hash, 32);

      stack.push(hash);
    }

    // Test the "unique-nes" of the generated numbers
    const uniqueStack = stack.filter(
      (value, index, self) => index === self.indexOf(value)
    );

    assert.lengthOf(stack, uniqueStack.length);
  });

  it("[loop] should produce unique results on seed range from negative to positive", () => {
    const iterations = 10000;
    const stack = [];

    for (let i = -100; i <= iterations; i++) {
      const hash = murmurhash3_x86_128("This is awesome!", i);

      assert.lengthOf(hash, 32);

      stack.push(hash);
    }

    // Test the "unique-nes" of the generated numbers
    const uniqueStack = stack.filter(
      (value, index, self) => index === self.indexOf(value)
    );

    assert.lengthOf(stack, uniqueStack.length);
  });

  it("produces an exact reproducible hash (like defined in other implementations)", () => {
    const hash1 = murmurhash3_x86_128("string", 0);
    const hash2 = murmurhash3_x86_128("string", 13);
    const hash3 = murmurhash3_x86_128("something", 5);

    assert.strictEqual(hash1, "e3f975734ee675d931a5e87931a5e879");
    assert.strictEqual(hash2, "cac24e218730ecd2b219057fb219057f");
    assert.strictEqual(hash3, "0c08333f4495f99af09eefaf0af90040");
  });

  it("tests in the readme used examples", () => {
    const hash1 = murmurhash3_x86_128("Hello");
    const hash2 = murmurhash3_x86_128("My string.");
    const hash3 = murmurhash3_x86_128("My string.", 0);

    assert.strictEqual(hash1, "2360ae465e6336c6ad45b3f4ad45b3f4");
    assert.strictEqual(hash2, "ca7923d5ac241973eb7c1c181cd7a4d1");
    assert.strictEqual(hash3, hash2);
  });

  describe("C++ reference", () => {
    it("regular text 1", () => {
      const testString = "I will not buy this record, it is scratched.";
      const hash = murmurhash3_x86_128(testString);

      assert.strictEqual(hash, "a0a9683b25ac5e40d9af2895890dddf5");
    });

    it("regular text 2", () => {
      const testString = "I will not buy this tobaconnists, it is scratched.";
      const hash = murmurhash3_x86_128(testString);

      assert.strictEqual(hash, "0b8149d2f251cfb86756c95a17ff3909");
    });

    it("regular text 3", () => {
      const testString = "My hovercraft is full of eels.";
      const hash = murmurhash3_x86_128(testString);

      assert.strictEqual(hash, "e3a186aee169ba6c6a8bd9343c68fa9c");
    });

    it("using emojis", () => {
      const testString = "My 🚀 is full of 🦎.";
      const hash = murmurhash3_x86_128(testString);

      assert.strictEqual(hash, "e616d85ffee7f678dab461995b5bb90f");
    });

    it("chinese characters", () => {
      const testString = "吉 星 高 照";
      const hash = murmurhash3_x86_128(testString);

      assert.strictEqual(hash, "bb39ba50e4b2457c738e6d76b66d9304");
    });
  });
});

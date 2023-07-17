import { assert } from "chai";
import { requireFunction } from "./helper";

const murmurhash3_x64_128 = requireFunction("murmurhash3_x64_128");

describe("murmurhash3_x64_128()", () => {
  it("should throw a TypeError if no hash is passed", () => {
    assert.throws(
      () => murmurhash3_x64_128(),
      TypeError,
      "murmurhash3_x64_128(): first argument is not a string.",
    );
  });

  it("should throw a TypeError if no string as hash is passed", () => {
    assert.throws(
      () => murmurhash3_x64_128(true),
      TypeError,
      "murmurhash3_x64_128(): first argument is not a string.",
    );
  });

  it("returns zero on empty string", () => {
    const testString = "";
    const hash = murmurhash3_x64_128(testString);

    assert.strictEqual(hash, "00000000000000000000000000000000");
  });

  it("should generate a 128 bit hash by string", () => {
    const testString = "Awkward code!";
    const hash = murmurhash3_x64_128(testString);

    assert.strictEqual(hash, "37c9f076b6a2daf8687526063e0e5415");
  });

  it("should generate a 128 bit hash by string of length 1", () => {
    const testString = "a";
    const hash = murmurhash3_x64_128(testString);

    assert.strictEqual(hash, "85555565f6597889e6b53a48510e895a");
  });

  it("should generate a 128 bit hash by string of length 2", () => {
    const testString = "ab";
    const hash = murmurhash3_x64_128(testString);

    assert.strictEqual(hash, "938b11ea16ed1b2ee65ea7019b52d4ad");
  });

  it("should generate a 128 bit hash by string of length 3", () => {
    const testString = "abc";
    const hash = murmurhash3_x64_128(testString);

    assert.strictEqual(hash, "b4963f3f3fad78673ba2744126ca2d52");
  });

  it("produces a different hash with same string but different seed", () => {
    const testString = "This is awesome!";
    const hash1 = murmurhash3_x64_128(testString, 1);
    const hash2 = murmurhash3_x64_128(testString, 2);

    assert.notStrictEqual(hash1, hash2);
  });

  it("produces the same hash with same string and seed", () => {
    const testString = "This is awesome!";
    const hash1 = murmurhash3_x64_128(testString, 1);
    const hash2 = murmurhash3_x64_128(testString, 1);
    const hash3 = murmurhash3_x64_128(testString, 1);
    const hash4 = murmurhash3_x64_128(testString, 1);

    assert.strictEqual(hash1, hash2);
    assert.strictEqual(hash3, hash4);
    assert.strictEqual(hash4, hash1);
  });

  it("should return a valid result if seed is 0", () => {
    const testString = "This is awesome!";
    const hash = murmurhash3_x64_128(testString, 0);

    assert.strictEqual(hash, "bf9fa1d30ef5f7ec1c3d7a47fe61f04b");
  });

  it("should return a valid result on negative seed", () => {
    const testString = "This is awesome!";
    const hash = murmurhash3_x64_128(testString, -10);

    assert.strictEqual(hash, "d99640f141effa5a996336a344824ea6");
  });

  it("throws a TypeError on float seed value", () => {
    assert.throws(() => murmurhash3_x64_128("", 0.2), TypeError);
  });

  it("[loop] should produce unique results on unsigned seeds", () => {
    const iterations = 5000;
    const stack = [];

    for (let i = 0; i <= iterations; i++) {
      const hash = murmurhash3_x64_128("This is awesome!", i);

      assert.lengthOf(hash, 32);

      stack.push(hash);
    }

    // Test the "unique-nes" of the generated numbers
    const uniqueStack = stack.filter(
      (value, index, self) => index === self.indexOf(value),
    );

    assert.lengthOf(stack, uniqueStack.length);
  });

  it("[loop] should produce unique results on seed range from negative to positive", () => {
    const iterations = 5000;
    const stack = [];

    for (let i = -100; i <= iterations; i++) {
      const hash = murmurhash3_x64_128("This is awesome!", i);

      assert.lengthOf(hash, 32);

      stack.push(hash);
    }

    // Test the "unique-nes" of the generated numbers
    const uniqueStack = stack.filter(
      (value, index, self) => index === self.indexOf(value),
    );

    assert.lengthOf(stack, uniqueStack.length);
  });

  it("produces an exact reproducible hash (like defined in other implementations)", () => {
    const hash1 = murmurhash3_x64_128("string", 0);
    const hash2 = murmurhash3_x64_128("string", 13);
    const hash3 = murmurhash3_x64_128("something", 5);

    assert.strictEqual(hash1, "4563abe73b11235dc7c3775d3e34f165");
    assert.strictEqual(hash2, "0183d85d6a09bcaefe09ff03fd949423");
    assert.strictEqual(hash3, "de698e585d54db8d9313e4e3b8bebcd9");
  });

  it("test examples that are used inside documentation (readme)", () => {
    const hash1 = murmurhash3_x64_128("Hello");
    const hash2 = murmurhash3_x64_128("My string.");
    const hash3 = murmurhash3_x64_128("My string.", 0);

    assert.strictEqual(hash1, "35b974ff55d4c41ca000eacf29125544");
    assert.strictEqual(hash2, "47e277afe6e776720a20caf1fdd91fe0");
    assert.strictEqual(hash3, hash2);
  });

  describe("C++ reference", () => {
    const reference = require("../../reference/cpp/results.json")[
      "murmurHash3_x64_128"
    ];

    Object.entries(reference).forEach(([name, test]) => {
      it(name, () => {
        const hash = murmurhash3_x64_128(test.input);
        assert.strictEqual(hash, test.output);
      });
    });
  });
});

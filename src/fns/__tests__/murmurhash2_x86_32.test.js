import { assert } from "chai";
import { requireFunction } from "./helper";

const murmurhash2_x86_32 = requireFunction("murmurhash2_x86_32");

describe("murmurhash2_x86_32()", () => {
  it("should throw a TypeError if no hash is passed", () => {
    assert.throws(
      () => murmurhash2_x86_32(),
      TypeError,
      "murmurhash2_x86_32(): first argument is not a string."
    );
  });

  it("should throw a TypeError if no string as hash is passed", () => {
    assert.throws(
      () => murmurhash2_x86_32(true),
      TypeError,
      "murmurhash2_x86_32(): first argument is not a string."
    );
  });

  it("returns zero on empty string", () => {
    const testString = "";
    const hash = murmurhash2_x86_32(testString);

    assert.strictEqual(hash, 0);
  });

  it("should generate an number hash by string", () => {
    const testString = "Awkward code!";
    const hash = murmurhash2_x86_32(testString);

    assert.isAbove(hash, 1);
    assert.isTrue(hash % 1 === 0);
  });

  it("should generate an number hash by string of length 1", () => {
    const testString = "I";
    const hash = murmurhash2_x86_32(testString);

    assert.isAbove(hash, 1);
    assert.isTrue(hash % 1 === 0);
  });

  it("should generate an number hash by string of length 2", () => {
    const testString = "am";
    const hash = murmurhash2_x86_32(testString);

    assert.isAbove(hash, 1);
    assert.isTrue(hash % 1 === 0);
  });

  it("should generate an number hash by string of length 3", () => {
    const testString = "MHF";
    const hash = murmurhash2_x86_32(testString);

    assert.isAbove(hash, 1);
    assert.isTrue(hash % 1 === 0);
  });

  it("produces a different hash with same string but different seed", () => {
    const testString = "Awkward code!";
    const hash1 = murmurhash2_x86_32(testString, 1);
    const hash2 = murmurhash2_x86_32(testString, 2);

    assert.notStrictEqual(hash1, hash2);
  });

  it("produces the same hash with same string and seed", () => {
    const testString = "Awkward code!";
    const hash1 = murmurhash2_x86_32(testString, 1);
    const hash2 = murmurhash2_x86_32(testString, 1);
    const hash3 = murmurhash2_x86_32(testString, 1);
    const hash4 = murmurhash2_x86_32(testString, 1);

    assert.strictEqual(hash1, hash2);
    assert.strictEqual(hash3, hash4);
    assert.strictEqual(hash4, hash1);
  });

  it("should return a valid result if seed is 0", () => {
    const testString = "Awkward code!";
    const hash = murmurhash2_x86_32(testString, 0);

    assert.isAbove(hash, 1);
    assert.isTrue(hash % 1 === 0);
  });

  it("should return a valid result on negative seed", () => {
    const testString = "Awkward code!";
    const hash = murmurhash2_x86_32(testString, -10);

    assert.isAbove(hash, 1);
    assert.isTrue(hash % 1 === 0);
  });

  it("throws a TypeError on float seed value", () => {
    assert.throws(() => murmurhash2_x86_32("", 0.2), TypeError);
  });

  it("[loop] should produce unique results on unsigned seeds", () => {
    const iterations = 10000;
    const stack = [];

    for (let i = 0; i <= iterations; i++) {
      const hash = murmurhash2_x86_32("Awkward code!", i);

      assert.isAbove(hash, 1);
      assert.isTrue(hash % 1 === 0);

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
      const hash = murmurhash2_x86_32("Awkward code!", i);

      assert.isAbove(hash, 1);
      assert.isTrue(hash % 1 === 0);

      stack.push(hash);
    }

    // Test the "unique-nes" of the generated numbers
    const uniqueStack = stack.filter(
      (value, index, self) => index === self.indexOf(value)
    );

    assert.lengthOf(stack, uniqueStack.length);
  });

  it("produces an exact reproducible hash (like defined in other implementations)", () => {
    const hash1 = murmurhash2_x86_32("string", 0);
    const hash2 = murmurhash2_x86_32("string", 13);
    const hash3 = murmurhash2_x86_32("something", 5);

    assert.strictEqual(hash1, 1640947696);
    assert.strictEqual(hash2, 485409088);
    assert.strictEqual(hash3, 4098796303);
  });

  it("test examples that are used inside documentation (readme)", () => {
    const hash1 = murmurhash2_x86_32("Hello");
    const hash2 = murmurhash2_x86_32("My string.");
    const hash3 = murmurhash2_x86_32("My string.", 0);

    assert.strictEqual(hash1, 1826530862);
    assert.strictEqual(hash2, 1836966117);
    assert.strictEqual(hash3, hash2);
  });

  it("do not return 0 for strings length multiply of 4", () => {
    const hash1 = murmurhash2_x86_32("A");
    const hash2 = murmurhash2_x86_32("AA");
    const hash3 = murmurhash2_x86_32("AAA");
    const hash4 = murmurhash2_x86_32("AAAA");
    const hash5 = murmurhash2_x86_32("AAAAA");
    const hash6 = murmurhash2_x86_32("AAAAAA");
    const hash7 = murmurhash2_x86_32("AAAAAAA");
    const hash8 = murmurhash2_x86_32("AAAAAAAA");
    const hash9 = murmurhash2_x86_32("AAAAAAAAAAAA");

    assert.strictEqual(hash1, 636687721);
    assert.strictEqual(hash2, 3621601297);
    assert.strictEqual(hash3, 2474210034);
    assert.strictEqual(hash4, 1480750041);
    assert.strictEqual(hash5, 2462844500);
    assert.strictEqual(hash6, 263112632);
    assert.strictEqual(hash7, 433066591);
    assert.strictEqual(hash8, 586671992);
    assert.strictEqual(hash9, 285004715);
  });

  describe("C++ reference", () => {
    const reference = require("../../reference/cpp/results.json")[
      "murmurHash2_x86_32"
    ];

    Object.entries(reference).forEach(([name, test]) => {
      it(name, () => {
        const hash = murmurhash2_x86_32(test.input);
        assert.strictEqual(hash, test.output);
      });
    });
  });
});

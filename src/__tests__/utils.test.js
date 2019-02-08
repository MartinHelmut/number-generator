import { assert } from "chai";
import {
    uMul32Getter,
    uInt32Getter,
    throwInvalidMurmurSeed,
    throwInvalidAleaSeed,
    throwInvalidStringHash
} from "../utils";

describe("utils", () => {
    describe("uMul32Getter()", () => {
        it("returns respective value on for range of -1 to 1", () => {
            assert.strictEqual(uMul32Getter(-1, -1), 1);
            assert.strictEqual(uMul32Getter(0, 0), 0);
            assert.strictEqual(uMul32Getter(1, 1), 1);
        });

        it("first argument is a multiplicand for second", () => {
            assert.strictEqual(uMul32Getter(1, 4), 4);
            assert.strictEqual(uMul32Getter(2, 4), 8);
            assert.strictEqual(uMul32Getter(1, 12), 12);
            assert.strictEqual(uMul32Getter(2, 12), 24);
            assert.strictEqual(uMul32Getter(2, 10), 20);
            assert.strictEqual(uMul32Getter(2, 11), 22);
            assert.strictEqual(uMul32Getter(10, 10), 100);
        });

        it("converts float to integer values by removing the fraction", () => {
            assert.strictEqual(uMul32Getter(0.5, 0.5), 0);
            assert.strictEqual(uMul32Getter(1.4, 1.6), 1);
            assert.strictEqual(uMul32Getter(5.7, 2.3), 10);
        });
    });

    describe("uInt32Getter()", () => {
        it("returns an unsigned integer by a position on a string", () => {
            assert.strictEqual(uInt32Getter("a", 0), 97);
        });

        it("returns an unsigned integer incremented by a left shift of 8 bit", () => {
            assert.strictEqual(uInt32Getter("ab", 0), 25185);
            assert.strictEqual(uInt32Getter("abc", 0), 6513249);
            assert.strictEqual(uInt32Getter("abcd", 0), 1684234849);
        });

        it("calculates the unsigned integer for a maximum of 4 characters", () => {
            const int1 = uInt32Getter("abcd", 0);
            const int2 = uInt32Getter("abcde", 0);

            assert.strictEqual(int1, int2);
        });
    });

    describe("throwInvalidMurmurSeed()", () => {
        it("throws a TypeError if seed is a float", () => {
            assert.throws(() => throwInvalidMurmurSeed(1.2), TypeError);
        });

        it("does not throw if integer is given", () => {
            assert.doesNotThrow(() => throwInvalidMurmurSeed(1));
            assert.doesNotThrow(() => throwInvalidMurmurSeed(-2));
        });

        it("does not throw if nothing is given", () => {
            assert.doesNotThrow(() => throwInvalidMurmurSeed());
        });
    });

    describe("throwInvalidAleaSeed()", () => {
        it("throws a TypeError if seed is a float", () => {
            assert.throws(() => throwInvalidAleaSeed(1.2), TypeError);
        });

        it("throws a TypeError if seed is smaller 1", () => {
            assert.throws(() => throwInvalidAleaSeed(0), TypeError);
            assert.throws(() => throwInvalidAleaSeed(-1), TypeError);
        });

        it("does not throw if seed is one or greater", () => {
            assert.doesNotThrow(() => throwInvalidAleaSeed(1));
            assert.doesNotThrow(() => throwInvalidAleaSeed(2));
        });
    });

    describe("throwInvalidStringHash()", () => {
        it("throws a TypeError if hash is undefined", () => {
            assert.throws(
                () => throwInvalidStringHash(),
                TypeError,
                "first argument is not a string."
            );
        });

        it("throws a TypeError if hash is not a string", () => {
            assert.throws(
                () => throwInvalidStringHash({}),
                TypeError,
                "first argument is not a string."
            );
        });

        it("takes an optional function name to enhance the error message", () => {
            assert.throws(
                () => throwInvalidStringHash(null, "functionName"),
                TypeError,
                "functionName() first argument is not a string."
            );
        });

        it("does not throw if hash is a string", () => {
            assert.doesNotThrow(() => throwInvalidStringHash("Hash"));
        });
    });
});

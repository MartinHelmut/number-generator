/** @module number-generator/lib/murmurhash3_x64_128 */
import {
  createConcatenatedHash,
  throwInvalidMurmurSeed,
  throwInvalidStringHash,
  toUtf8Bytes
} from "../utils";

/**
 * Generate a non-cryptic 128 bit number hash for x64 with murmur3 algorithm.
 *
 * From {@link https://github.com/karanlyons/murmurHash3.js}
 * Karan Lyons, 2014
 * Refactored and extended including fixes for edge cases from Martin Helmut Fieber <info@martin-fieber.de>
 *
 * @export number-generator/lib/murmurhash3_x86_128
 * @throws {TypeError} Throws an exception if hash is not a string
 * @throws {TypeError} Throws an exception if seed is a float
 * @param {string} str The base string hash to generate number
 * @param {number} [seed=0] An optional seed value
 * @return {string} Generated 128 bit hash
 */
export default (() => {
  const MULTIPLIER_1 = [0x87c37b91, 0x114253d5];
  const MULTIPLIER_2 = [0x4cf5ad43, 0x2745937f];

  const BIT_AND_BASE = 0xffff;

  /**
   * Multiple two 64 bit int (as an array with two 32 bit int)
   *
   * @private
   * @param {number[]} x 64 bit int as two 32 bit int, represented as tuple of 2
   * @param {number[]} y 64 bit int as two 32 bit int, represented as tuple of 2
   * @returns {number[]} Multiplied 64 bit int as two 32 bit int, represented as tuple of 2
   */
  function uInt64Multiply(x, y) {
    const o = [0, 0, 0, 0];

    x = [x[0] >>> 16, x[0] & BIT_AND_BASE, x[1] >>> 16, x[1] & BIT_AND_BASE];
    y = [y[0] >>> 16, y[0] & BIT_AND_BASE, y[1] >>> 16, y[1] & BIT_AND_BASE];

    o[3] += x[3] * y[3];
    o[2] += o[3] >>> 16;
    o[3] &= BIT_AND_BASE;

    o[2] += x[2] * y[3];
    o[1] += o[2] >>> 16;
    o[2] &= BIT_AND_BASE;

    o[2] += x[3] * y[2];
    o[1] += o[2] >>> 16;
    o[2] &= BIT_AND_BASE;

    o[1] += x[1] * y[3];
    o[0] += o[1] >>> 16;
    o[1] &= BIT_AND_BASE;

    o[1] += x[2] * y[2];
    o[0] += o[1] >>> 16;
    o[1] &= BIT_AND_BASE;

    o[1] += x[3] * y[1];
    o[0] += o[1] >>> 16;
    o[1] &= BIT_AND_BASE;

    o[0] += x[0] * y[3] + x[1] * y[2] + x[2] * y[1] + x[3] * y[0];
    o[0] &= BIT_AND_BASE;

    return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
  }

  /**
   * Add two 64 bit int together (as an array with two 32 bit int)
   *
   * @private
   * @param {number[]} x 64 bit int as two 32 bit int, represented as tuple of 2
   * @param {number[]} y 64 bit int as two 32 bit int, represented as tuple of 2
   * @returns {number[]} Added 64 bit int as two 32 bit int, represented as tuple of 2
   */
  function uInt64Add(x, y) {
    const o = [0, 0, 0, 0];

    x = [x[0] >>> 16, x[0] & BIT_AND_BASE, x[1] >>> 16, x[1] & BIT_AND_BASE];
    y = [y[0] >>> 16, y[0] & BIT_AND_BASE, y[1] >>> 16, y[1] & BIT_AND_BASE];

    o[3] += x[3] + y[3];
    o[2] += o[3] >>> 16;
    o[3] &= BIT_AND_BASE;

    o[2] += x[2] + y[2];
    o[1] += o[2] >>> 16;
    o[2] &= BIT_AND_BASE;

    o[1] += x[1] + y[1];
    o[0] += o[1] >>> 16;
    o[1] &= BIT_AND_BASE;

    o[0] += x[0] + y[0];
    o[0] &= BIT_AND_BASE;

    return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
  }

  /**
   * Returns the 64 int rotated left by the number of positions
   *
   * @private
   * @param {number[]} bytes 64 bit int as two 32 bit int, represented as tuple of 2
   * @param {number} position Positions to rotate int
   * @returns {number[]} Left rotated 64 bit int as two 32 bit int, represented as tuple of 2
   */
  function uInt64RotateLeft(bytes, position) {
    position %= 64;

    if (position < 32) {
      return [
        (bytes[0] << position) | (bytes[1] >>> (32 - position)),
        (bytes[1] << position) | (bytes[0] >>> (32 - position))
      ];
    }

    position -= 32;
    return [
      (bytes[1] << position) | (bytes[0] >>> (32 - position)),
      (bytes[0] << position) | (bytes[1] >>> (32 - position))
    ];
  }

  /**
   * Returns the 64 int with left shift by the number of positions
   *
   * @private
   * @param {number[]} bytes 64 bit int as two 32 bit int, represented as tuple of 2
   * @param {number} position Positions to shift int
   * @returns {number[]} Multiplied 64 bit int as two 32 bit int, represented as tuple of 2
   */
  function uInt64LeftShift(bytes, position) {
    position %= 64;

    if (position < 32) {
      return [
        (bytes[0] << position) | (bytes[1] >>> (32 - position)),
        bytes[1] << position
      ];
    }

    return [bytes[1] << (position - 32), 0];
  }

  /**
   * Returns the 64 int xor-ed together from two 64 int
   *
   * @private
   * @param {number[]} x 64 bit int as two 32 bit int, represented as tuple of 2
   * @param {number[]} y 64 bit int as two 32 bit int, represented as tuple of 2
   * @returns {number[]} Xor-ed 64 bit int, represented as tuple of 2
   */
  function uInt64Xor(x, y) {
    return [x[0] ^ y[0], x[1] ^ y[1]];
  }

  /**
   * Mix hash for x64
   *
   * @private
   * @param {number[]} hash 64 bit int as two 32 bit int, represented as tuple of 2
   * @returns {number[]} Mixed 64 bit int as two 32 bit int, represented as tuple of 2
   */
  function uInt64mix(hash) {
    hash = uInt64Xor(hash, [0, hash[0] >>> 1]);
    hash = uInt64Multiply(hash, [0xff51afd7, 0xed558ccd]);
    hash = uInt64Xor(hash, [0, hash[0] >>> 1]);
    hash = uInt64Multiply(hash, [0xc4ceb9fe, 0x1a85ec53]);
    hash = uInt64Xor(hash, [0, hash[0] >>> 1]);

    return hash;
  }

  /**
   * Generate a non-cryptic 128 bit number hash for x64 with murmur3 algorithm.
   *
   * @throws {TypeError} Throws an exception if hash is not a string
   * @throws {TypeError} Throws an exception if seed is a float
   * @param {string} str The base string hash to generate number
   * @param {number} [seed=0] An optional seed value
   * @return {string} Generated 128 bit hash
   */
  function murmurhash3_x64_128(str, seed = 0) {
    throwInvalidStringHash(str, "murmurhash3_x64_128");
    throwInvalidMurmurSeed(seed);

    const hash = toUtf8Bytes(str);
    const remainder = hash.length % 16;
    const bytes = hash.length - remainder;

    let hashSum1 = [0, seed];
    let hashSum2 = [0, seed];

    let calculated1 = [0, 0];
    let calculated2 = [0, 0];

    let currentIndex = 0;

    while (currentIndex < bytes) {
      calculated1 = [
        (hash[currentIndex + 4] & 0xff) |
          ((hash[currentIndex + 5] & 0xff) << 8) |
          ((hash[currentIndex + 6] & 0xff) << 16) |
          ((hash[currentIndex + 7] & 0xff) << 24),
        (hash[currentIndex] & 0xff) |
          ((hash[currentIndex + 1] & 0xff) << 8) |
          ((hash[currentIndex + 2] & 0xff) << 16) |
          ((hash[currentIndex + 3] & 0xff) << 24)
      ];
      calculated2 = [
        (hash[currentIndex + 12] & 0xff) |
          ((hash[currentIndex + 13] & 0xff) << 8) |
          ((hash[currentIndex + 14] & 0xff) << 16) |
          ((hash[currentIndex + 15] & 0xff) << 24),
        (hash[currentIndex + 8] & 0xff) |
          ((hash[currentIndex + 9] & 0xff) << 8) |
          ((hash[currentIndex + 10] & 0xff) << 16) |
          ((hash[currentIndex + 11] & 0xff) << 24)
      ];

      calculated1 = uInt64Multiply(calculated1, MULTIPLIER_1);
      calculated1 = uInt64RotateLeft(calculated1, 31);
      calculated1 = uInt64Multiply(calculated1, MULTIPLIER_2);
      hashSum1 = uInt64Xor(hashSum1, calculated1);

      hashSum1 = uInt64RotateLeft(hashSum1, 27);
      hashSum1 = uInt64Add(hashSum1, hashSum2);
      hashSum1 = uInt64Add(uInt64Multiply(hashSum1, [0, 5]), [0, 0x52dce729]);

      calculated2 = uInt64Multiply(calculated2, MULTIPLIER_2);
      calculated2 = uInt64RotateLeft(calculated2, 33);
      calculated2 = uInt64Multiply(calculated2, MULTIPLIER_1);
      hashSum2 = uInt64Xor(hashSum2, calculated2);

      hashSum2 = uInt64RotateLeft(hashSum2, 31);
      hashSum2 = uInt64Add(hashSum2, hashSum1);
      hashSum2 = uInt64Add(uInt64Multiply(hashSum2, [0, 5]), [0, 0x38495ab5]);

      currentIndex += 16;
    }

    calculated1 = [0, 0];
    calculated2 = [0, 0];

    switch (remainder) {
      case 15:
        calculated2 = uInt64Xor(
          calculated2,
          uInt64LeftShift([0, hash[currentIndex + 14]], 48)
        );
      // eslint-disable-next-line no-fallthrough
      case 14:
        calculated2 = uInt64Xor(
          calculated2,
          uInt64LeftShift([0, hash[currentIndex + 13]], 40)
        );
      // eslint-disable-next-line no-fallthrough
      case 13:
        calculated2 = uInt64Xor(
          calculated2,
          uInt64LeftShift([0, hash[currentIndex + 12]], 32)
        );
      // eslint-disable-next-line no-fallthrough
      case 12:
        calculated2 = uInt64Xor(
          calculated2,
          uInt64LeftShift([0, hash[currentIndex + 11]], 24)
        );
      // eslint-disable-next-line no-fallthrough
      case 11:
        calculated2 = uInt64Xor(
          calculated2,
          uInt64LeftShift([0, hash[currentIndex + 10]], 16)
        );
      // eslint-disable-next-line no-fallthrough
      case 10:
        calculated2 = uInt64Xor(
          calculated2,
          uInt64LeftShift([0, hash[currentIndex + 9]], 8)
        );
      // eslint-disable-next-line no-fallthrough
      case 9:
        calculated2 = uInt64Xor(calculated2, [0, hash[currentIndex + 8]]);
        calculated2 = uInt64Multiply(calculated2, MULTIPLIER_2);
        calculated2 = uInt64RotateLeft(calculated2, 33);
        calculated2 = uInt64Multiply(calculated2, MULTIPLIER_1);
        hashSum2 = uInt64Xor(hashSum2, calculated2);
      // eslint-disable-next-line no-fallthrough
      case 8:
        calculated1 = uInt64Xor(
          calculated1,
          uInt64LeftShift([0, hash[currentIndex + 7]], 56)
        );
      // eslint-disable-next-line no-fallthrough
      case 7:
        calculated1 = uInt64Xor(
          calculated1,
          uInt64LeftShift([0, hash[currentIndex + 6]], 48)
        );
      // eslint-disable-next-line no-fallthrough
      case 6:
        calculated1 = uInt64Xor(
          calculated1,
          uInt64LeftShift([0, hash[currentIndex + 5]], 40)
        );
      // eslint-disable-next-line no-fallthrough
      case 5:
        calculated1 = uInt64Xor(
          calculated1,
          uInt64LeftShift([0, hash[currentIndex + 4]], 32)
        );
      // eslint-disable-next-line no-fallthrough
      case 4:
        calculated1 = uInt64Xor(
          calculated1,
          uInt64LeftShift([0, hash[currentIndex + 3]], 24)
        );
      // eslint-disable-next-line no-fallthrough
      case 3:
        calculated1 = uInt64Xor(
          calculated1,
          uInt64LeftShift([0, hash[currentIndex + 2]], 16)
        );
      // eslint-disable-next-line no-fallthrough
      case 2:
        calculated1 = uInt64Xor(
          calculated1,
          uInt64LeftShift([0, hash[currentIndex + 1]], 8)
        );
      // eslint-disable-next-line no-fallthrough
      case 1:
        calculated1 = uInt64Xor(calculated1, [0, hash[currentIndex]]);
        calculated1 = uInt64Multiply(calculated1, MULTIPLIER_1);
        calculated1 = uInt64RotateLeft(calculated1, 31);
        calculated1 = uInt64Multiply(calculated1, MULTIPLIER_2);
        hashSum1 = uInt64Xor(hashSum1, calculated1);
    }

    hashSum1 = uInt64Xor(hashSum1, [0, hash.length]);
    hashSum2 = uInt64Xor(hashSum2, [0, hash.length]);

    hashSum1 = uInt64Add(hashSum1, hashSum2);
    hashSum2 = uInt64Add(hashSum2, hashSum1);

    hashSum1 = uInt64mix(hashSum1);
    hashSum2 = uInt64mix(hashSum2);

    hashSum1 = uInt64Add(hashSum1, hashSum2);
    hashSum2 = uInt64Add(hashSum2, hashSum1);

    return createConcatenatedHash([
      hashSum1[0],
      hashSum1[1],
      hashSum2[0],
      hashSum2[1]
    ]);
  }

  return murmurhash3_x64_128;
})();

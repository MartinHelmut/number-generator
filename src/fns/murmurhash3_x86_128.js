/** @module number-generator/lib/murmurhash3_x86_128 */
import {
  throwInvalidMurmurSeed,
  throwInvalidStringHash,
  uIntx86mix,
  uInt32RotateLeft,
  uMul32Getter,
  toUtf8Bytes
} from "../utils";

/**
 * Generate a non-cryptic 128 bit number hash with murmur3 algorithm.
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
  const MULTIPLIER_1 = 0x239b961b;
  const MULTIPLIER_2 = 0xab0e9789;
  const MULTIPLIER_3 = 0x38b34ae5;
  const MULTIPLIER_4 = 0xa1e38b93;

  const CORRECTION_1 = 0x561ccd1b;
  const CORRECTION_2 = 0x0bcaa747;
  const CORRECTION_3 = 0x96cd1c35;
  const CORRECTION_4 = 0x32ac3b17;

  /**
   * Generate a non-cryptic 128 bit number hash with murmur3 algorithm
   *
   * @throws {TypeError} Throws an exception if hash is not a string
   * @throws {TypeError} Throws an exception if seed is a float
   * @param {string} str The base string hash to generate number
   * @param {number} [seed=0] An optional seed value
   * @return {string} Generated 128 bit hash
   */
  function murmurhash3_x86_128(str, seed = 0) {
    throwInvalidStringHash(str, "murmurhash3_x86_128");
    throwInvalidMurmurSeed(seed);

    const hash = toUtf8Bytes(str);
    const remainder = hash.length % 16;
    const bytes = hash.length - remainder;

    let hashSum1 = seed;
    let hashSum2 = seed;
    let hashSum3 = seed;
    let hashSum4 = seed;

    let calculated1 = 0;
    let calculated2 = 0;
    let calculated3 = 0;
    let calculated4 = 0;

    let currentIndex = 0;

    while (currentIndex < bytes) {
      calculated1 =
        (hash[currentIndex] & 0xff) |
        ((hash[currentIndex + 1] & 0xff) << 8) |
        ((hash[currentIndex + 2] & 0xff) << 16) |
        ((hash[currentIndex + 3] & 0xff) << 24);
      calculated2 =
        (hash[currentIndex + 4] & 0xff) |
        ((hash[currentIndex + 5] & 0xff) << 8) |
        ((hash[currentIndex + 6] & 0xff) << 16) |
        ((hash[currentIndex + 7] & 0xff) << 24);
      calculated3 =
        (hash[currentIndex + 8] & 0xff) |
        ((hash[currentIndex + 9] & 0xff) << 8) |
        ((hash[currentIndex + 10] & 0xff) << 16) |
        ((hash[currentIndex + 11] & 0xff) << 24);
      calculated4 =
        (hash[currentIndex + 12] & 0xff) |
        ((hash[currentIndex + 13] & 0xff) << 8) |
        ((hash[currentIndex + 14] & 0xff) << 16) |
        ((hash[currentIndex + 15] & 0xff) << 24);

      calculated1 = uMul32Getter(calculated1, MULTIPLIER_1);
      calculated1 = uInt32RotateLeft(calculated1, 15);
      calculated1 = uMul32Getter(calculated1, MULTIPLIER_2);
      hashSum1 ^= calculated1;

      hashSum1 = uInt32RotateLeft(hashSum1, 19);
      hashSum1 += hashSum2;
      hashSum1 = uMul32Getter(hashSum1, 5) + CORRECTION_1;

      calculated2 = uMul32Getter(calculated2, MULTIPLIER_2);
      calculated2 = uInt32RotateLeft(calculated2, 16);
      calculated2 = uMul32Getter(calculated2, MULTIPLIER_3);
      hashSum2 ^= calculated2;

      hashSum2 = uInt32RotateLeft(hashSum2, 17);
      hashSum2 += hashSum3;
      hashSum2 = uMul32Getter(hashSum2, 5) + CORRECTION_2;

      calculated3 = uMul32Getter(calculated3, MULTIPLIER_3);
      calculated3 = uInt32RotateLeft(calculated3, 17);
      calculated3 = uMul32Getter(calculated3, MULTIPLIER_4);
      hashSum3 ^= calculated3;

      hashSum3 = uInt32RotateLeft(hashSum3, 15);
      hashSum3 += hashSum4;
      hashSum3 = uMul32Getter(hashSum3, 5) + CORRECTION_3;

      calculated4 = uMul32Getter(calculated4, MULTIPLIER_4);
      calculated4 = uInt32RotateLeft(calculated4, 18);
      calculated4 = uMul32Getter(calculated4, MULTIPLIER_1);
      hashSum4 ^= calculated4;

      hashSum4 = uInt32RotateLeft(hashSum4, 13);
      hashSum4 += hashSum1;
      hashSum4 = uMul32Getter(hashSum4, 5) + CORRECTION_4;

      currentIndex += 16;
    }

    calculated1 = 0;
    calculated2 = 0;
    calculated3 = 0;
    calculated4 = 0;

    switch (remainder) {
      case 15:
        calculated4 ^= hash[currentIndex + 14] << 16;
      // eslint-disable-next-line no-fallthrough
      case 14:
        calculated4 ^= hash[currentIndex + 13] << 8;
      // eslint-disable-next-line no-fallthrough
      case 13:
        calculated4 ^= hash[currentIndex + 12];
        calculated4 = uMul32Getter(calculated4, MULTIPLIER_4);
        calculated4 = uInt32RotateLeft(calculated4, 18);
        calculated4 = uMul32Getter(calculated4, MULTIPLIER_1);
        hashSum4 ^= calculated4;
      // eslint-disable-next-line no-fallthrough
      case 12:
        calculated3 ^= hash[currentIndex + 11] << 24;
      // eslint-disable-next-line no-fallthrough
      case 11:
        calculated3 ^= hash[currentIndex + 10] << 16;
      // eslint-disable-next-line no-fallthrough
      case 10:
        calculated3 ^= hash[currentIndex + 9] << 8;
      // eslint-disable-next-line no-fallthrough
      case 9:
        calculated3 ^= hash[currentIndex + 8];
        calculated3 = uMul32Getter(calculated3, MULTIPLIER_3);
        calculated3 = uInt32RotateLeft(calculated3, 17);
        calculated3 = uMul32Getter(calculated3, MULTIPLIER_4);
        hashSum3 ^= calculated3;
      // eslint-disable-next-line no-fallthrough
      case 8:
        calculated2 ^= hash[currentIndex + 7] << 24;
      // eslint-disable-next-line no-fallthrough
      case 7:
        calculated2 ^= hash[currentIndex + 6] << 16;
      // eslint-disable-next-line no-fallthrough
      case 6:
        calculated2 ^= hash[currentIndex + 5] << 8;
      // eslint-disable-next-line no-fallthrough
      case 5:
        calculated2 ^= hash[currentIndex + 4];
        calculated2 = uMul32Getter(calculated2, MULTIPLIER_2);
        calculated2 = uInt32RotateLeft(calculated2, 16);
        calculated2 = uMul32Getter(calculated2, MULTIPLIER_3);
        hashSum2 ^= calculated2;
      // eslint-disable-next-line no-fallthrough
      case 4:
        calculated1 ^= hash[currentIndex + 3] << 24;
      // eslint-disable-next-line no-fallthrough
      case 3:
        calculated1 ^= hash[currentIndex + 2] << 16;
      // eslint-disable-next-line no-fallthrough
      case 2:
        calculated1 ^= hash[currentIndex + 1] << 8;
      // eslint-disable-next-line no-fallthrough
      case 1:
        calculated1 ^= hash[currentIndex];
        calculated1 = uMul32Getter(calculated1, MULTIPLIER_1);
        calculated1 = uInt32RotateLeft(calculated1, 15);
        calculated1 = uMul32Getter(calculated1, MULTIPLIER_2);
        hashSum1 ^= calculated1;
    }

    hashSum1 ^= hash.length;
    hashSum2 ^= hash.length;
    hashSum3 ^= hash.length;
    hashSum4 ^= hash.length;

    hashSum1 += hashSum2;
    hashSum1 += hashSum3;
    hashSum1 += hashSum4;
    hashSum2 += hashSum1;
    hashSum3 += hashSum1;
    hashSum4 += hashSum1;

    hashSum1 = uIntx86mix(hashSum1);
    hashSum2 = uIntx86mix(hashSum2);
    hashSum3 = uIntx86mix(hashSum3);
    hashSum4 = uIntx86mix(hashSum4);

    hashSum1 += hashSum2;
    hashSum1 += hashSum3;
    hashSum1 += hashSum4;
    hashSum2 += hashSum1;
    hashSum3 += hashSum1;
    hashSum4 += hashSum1;

    return (
      ("00000000" + (hashSum1 >>> 0).toString(16)).slice(-8) +
      ("00000000" + (hashSum2 >>> 0).toString(16)).slice(-8) +
      ("00000000" + (hashSum3 >>> 0).toString(16)).slice(-8) +
      ("00000000" + (hashSum4 >>> 0).toString(16)).slice(-8)
    );
  }

  return murmurhash3_x86_128;
})();

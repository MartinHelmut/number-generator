/** @module number-generator/lib/murmurhash3_x86_32 */
import {
  uMul32Getter,
  uInt32Getter,
  uIntx86mix,
  uInt32RotateLeft,
  toUtf8Bytes,
  throwInvalidMurmurSeed,
  throwInvalidStringHash
} from "../utils";

/**
 * Generate a non-cryptic 32 bit number hash with murmur3 algorithm.
 *
 * From {@link https://github.com/karanlyons/murmurHash3.js}
 * Karan Lyons, 2014
 * Refactored and extended including fixes for edge cases from Martin Helmut Fieber <info@martin-fieber.de>
 *
 * @export number-generator/lib/murmurhash3_x86_32
 * @throws {TypeError} Throws an exception if hash is not a string
 * @throws {TypeError} Throws an exception if seed is a float
 * @param {string} str The base string hash to generate number
 * @param {number} [seed=0] An optional seed value
 * @return {number} Generated number
 */
export default (() => {
  const MULTIPLIER_1 = 0xcc9e2d51;
  const MULTIPLIER_2 = 0x1b873593;

  const CORRECTION = 0xe6546b64;

  /**
   * Generate a non-cryptic 32 bit number hash with murmur3 algorithm
   *
   * @throws {TypeError} Throws an exception if hash is not a string
   * @throws {TypeError} Throws an exception if seed is a float
   * @param {string} str The base string hash to generate number
   * @param {number} [seed=0] An optional seed value
   * @return {number} Generated number
   */
  function murmurhash3_x86_32(str, seed = 0) {
    throwInvalidStringHash(str, "murmurhash3_x86_32");
    throwInvalidMurmurSeed(seed);

    const hash = toUtf8Bytes(str);
    const remainder = hash.length % 4;
    const bytes = hash.length - remainder;

    let calculated = 0;
    let currentIndex = 0;
    let hashSum = seed;

    while (currentIndex < bytes) {
      calculated = uInt32Getter(hash, currentIndex);

      calculated = uMul32Getter(calculated, MULTIPLIER_1);
      calculated = uInt32RotateLeft(calculated, 15);
      calculated = uMul32Getter(calculated, MULTIPLIER_2);

      hashSum ^= calculated;
      hashSum = uInt32RotateLeft(hashSum, 13);
      hashSum = uMul32Getter(hashSum, 5) + CORRECTION;

      currentIndex += 4;
    }

    calculated = 0;

    switch (remainder) {
      case 3:
        calculated ^= (hash[currentIndex + 2] & 0xff) << 16;
      // eslint-disable-next-line no-fallthrough
      case 2:
        calculated ^= (hash[currentIndex + 1] & 0xff) << 8;
      // eslint-disable-next-line no-fallthrough
      case 1:
        calculated ^= hash[currentIndex];
        calculated = uMul32Getter(calculated, MULTIPLIER_1);
        calculated = uInt32RotateLeft(calculated, 15);
        calculated = uMul32Getter(calculated, MULTIPLIER_2);
        hashSum ^= calculated;
    }

    hashSum ^= hash.length;
    hashSum = uIntx86mix(hashSum);

    return hashSum >>> 0;
  }

  return murmurhash3_x86_32;
})();

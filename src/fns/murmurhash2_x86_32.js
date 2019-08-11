/** @module number-generator/lib/murmurhash2_x86_32 */
import {
  uMul32Getter,
  uInt32Getter,
  throwInvalidMurmurSeed,
  throwInvalidStringHash,
  toUtf8Bytes
} from "../utils";

/**
 * Generate a non-cryptic number hash with murmur2 algorithm
 *
 * From {@link https://gist.github.com/raycmorgan/588423}
 * Ray Morgan, 2011
 * Refactored and extended from Martin Helmut Fieber <info@martin-fieber.de>
 *
 * @export number-generator/lib/murmurhash2_x86_32
 * @throws {TypeError} Throws an exception if seed is a float
 * @param {string} hash The base string hash to generate number
 * @param {number} [seed=0] An optional seed value
 * @return {number} Generated number
 */
export default (() => {
  const MULTIPLIER = 0x5bd1e995;
  const BASE = 24;

  /**
   * Return an unsigned int16 from hash by position
   *
   * @private
   * @param {number[]} hash String hash value
   * @param {number} position String start position
   * @return {number} Unsigned int16
   */
  const uInt16Getter = (hash, position) =>
    hash[position++] + (hash[position] << 8);

  /**
   * Generate a non-cryptic number hash with murmur2 algorithm
   *
   * @throws {TypeError} Throws an exception if hash is not a string
   * @throws {TypeError} Throws an exception if seed is a float
   * @param {string} str The base string hash to generate number
   * @param {number} [seed=0] An optional seed value
   * @return {number} Generated number
   */
  function murmurhash2_x86_32(str, seed = 0) {
    throwInvalidStringHash(str, "murmurhash2_x86_32");
    throwInvalidMurmurSeed(seed);

    const hash = toUtf8Bytes(str);
    let currentIndex = 0;
    let hashSum = seed ^ hash.length;
    let length = hash.length;

    while (length >= 4) {
      let calculated = uInt32Getter(hash, currentIndex);

      calculated = uMul32Getter(calculated, MULTIPLIER);
      calculated ^= calculated >>> BASE;
      calculated = uMul32Getter(calculated, MULTIPLIER);

      hashSum = uMul32Getter(hashSum, MULTIPLIER);
      hashSum ^= calculated;

      currentIndex += 4;
      length -= 4;
    }

    switch (length) {
      case 3:
        hashSum ^= uInt16Getter(hash, currentIndex);
        hashSum ^= hash[currentIndex + 2] << 16;
        hashSum = uMul32Getter(hashSum, MULTIPLIER);
        break;
      case 2:
        hashSum ^= uInt16Getter(hash, currentIndex);
        hashSum = uMul32Getter(hashSum, MULTIPLIER);
        break;
      case 1:
        hashSum ^= hash[currentIndex];
        hashSum = uMul32Getter(hashSum, MULTIPLIER);
        break;
    }

    hashSum ^= hashSum >>> 13;
    hashSum = uMul32Getter(hashSum, MULTIPLIER);
    hashSum ^= hashSum >>> 15;

    return hashSum >>> 0;
  }

  return murmurhash2_x86_32;
})();

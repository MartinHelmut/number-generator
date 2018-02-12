/*! The MIT License (MIT) - Copyright (c) 2016-2018 Martin Helmut Fieber */

/** @module number-generator/lib/murmurhash2_x86_32 */
'use strict';

const MURMUR_MULTIPLIER = 0x5bd1e995;
const MURMUR_BASE = 24;

/**
 * Return an unsigned int32 from hash by position
 *
 * @private
 * @param {string} hash String hash value
 * @param {number} position String start position
 * @return {number} Unsigned int32
 */
function uInt32Getter(hash, position) {
    return (
        hash.charCodeAt(position++) +
        (hash.charCodeAt(position++) << 8) +
        (hash.charCodeAt(position++) << 16) +
        (hash.charCodeAt(position) << 24)
    );
}

/**
 * Return an unsigned int16 from hash by position
 *
 * @private
 * @param {string} hash String hash value
 * @param {number} position String start position
 * @return {number} Unsigned int16
 */
function uInt16Getter(hash, position) {
    return hash.charCodeAt(position++) + (hash.charCodeAt(position++) << 8);
}

/**
 * Returns a multiple unsigned int32
 *
 * @private
 * @param {number} x Non linear base
 * @param {number} y Linear base
 * @return {number} Unsigned int32
 */
function uMul32Getter(x, y) {
    x = x | 0;
    y = y | 0;
    const nonLinear = x & 0xffff;
    const linearBase = x >>> 16;

    return (nonLinear * y + (((linearBase * y) & 0xffff) << 16)) | 0;
}

/**
 * Generate a non-cryptic number hash with murmur2 algorithm
 *
 * From https://gist.github.com/raycmorgan/588423
 * Ray Morgan, 2011
 * Refactored and extended from Martin Helmut Fieber <info@martin-fieber.de>
 *
 * @throws {TypeError} Throws an exception if seed is a float
 * @param {string} hash The base string hash to generate number
 * @param {number} [seed=1] An optional seed value
 * @return {number} Generated number
 */
module.exports = function murmurhash2_x86_32(hash, seed = 1) {
    if (seed !== undefined && seed % 1 !== 0) {
        throw new TypeError('Expected seed to be an integer, float given');
    }

    let currentIndex = 0;
    let hashSum = seed ^ hash.length;
    let length = hash.length;

    while (length >= 4) {
        let calculated = uInt32Getter(hash, currentIndex);

        calculated = uMul32Getter(calculated, MURMUR_MULTIPLIER);
        calculated ^= calculated >>> MURMUR_BASE;
        calculated = uMul32Getter(calculated, MURMUR_MULTIPLIER);

        hashSum = uMul32Getter(hashSum, MURMUR_MULTIPLIER);
        hashSum ^= calculated;

        currentIndex += 4;
        length -= 4;
    }

    switch (length) {
        case 3:
            hashSum ^= uInt16Getter(hash, currentIndex);
            hashSum ^= hash.charCodeAt(currentIndex + 2) << 16;
            hashSum = uMul32Getter(hashSum, MURMUR_MULTIPLIER);
            break;
        case 2:
            hashSum ^= uInt16Getter(hash, currentIndex);
            hashSum = uMul32Getter(hashSum, MURMUR_MULTIPLIER);
            break;
        case 1:
            hashSum ^= hash.charCodeAt(currentIndex);
            hashSum = uMul32Getter(hashSum, MURMUR_MULTIPLIER);
            break;
        default:
            hashSum = 0;
    }

    hashSum ^= hashSum >>> 13;
    hashSum = uMul32Getter(hashSum, MURMUR_MULTIPLIER);
    hashSum ^= hashSum >>> 15;

    return hashSum >>> 0;
};

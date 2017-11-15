/** The MIT License (MIT) - Copyright (c) 2016 Martin Helmut Fieber */

/**
 * Number generator state
 *
 * @typedef {Object} NumberGeneratorState
 * @property {number} correction Alea correction value
 * @property {number[]} sequence An array of sequences for generating numbers
 */

/**
 * Number generator
 *
 * @namespace NumberGenerator
 */

/**
 * Set a seed for the generator
 *
 * @method
 * @memberof NumberGenerator
 * @name NumberGenerator#setSeed
 * @param {number} seed The seed to use for number generation
 * @return {number} Returns the passed seed
 */

/**
 * Get an unsigned float with max 32 bit
 *
 * @method
 * @memberof NumberGenerator
 * @name NumberGenerator#uFloat32
 * @return {number} Returns an unsigned float with max 32 bit
 */

/**
 * Get an unsigned integer with max 32 bit
 *
 * @method
 * @memberof NumberGenerator
 * @name NumberGenerator#uInt32
 * @return {number} Returns an unsigned integer with max 32 bit
 */

/**
 * Returns the current number generator state
 *
 * @method
 * @memberof NumberGenerator
 * @name NumberGenerator#getState
 * @return {NumberGeneratorState} Returns the internal number generator state
 */

/**
 * Set a new number generator state
 *
 * @method
 * @memberof NumberGenerator
 * @name NumberGenerator#setState
 * @param {NumberGeneratorState} [state] A pre configured state object
 */

const ALEA_CORRECTION_DEFAULT = 1;
const ALEA_FRACTURE_FLOAT = 2.3283064365386963e-10; // 2^-32
const ALEA_FRACTURE_INT = 0x100000000; // 2^32
const ALEA_TERM = 2091639;
const ALEA_MULTIPLIER = 69069;
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
 * Number generator with Alea algorithm
 *
 * From http://baagoe.com/en/RandomMusings/javascript/
 * Johannes Baagøe <baagoe@baagoe.com>, 2010
 * Refactored and extended from Martin Helmut Fieber <info@martin-fieber.de>
 *
 * @param {number} [initialSeed] Optional start seed number
 * @return {NumberGenerator} A number generator object
 */
export function aleaRNGFactory(initialSeed) {
    let correction = ALEA_CORRECTION_DEFAULT;
    let sequence0 = 0;
    let sequence1 = 0;
    let sequence2 = 0;

    /**
     * Set the used seed number
     *
     * @throws {TypeError} Throws an exception if seed is float or negative
     * @param {number} seed A number value
     * @return {number} The used number value
     */
    function setSeed(seed) {
        if (seed % 1 !== 0 || seed <= 0) {
            throw new TypeError(
                'Expected seed to be an unsigned integer greater 1'
            );
        }

        sequence0 = (seed >>> 0) * ALEA_FRACTURE_FLOAT;
        seed = (seed * ALEA_MULTIPLIER + 1) >>> 0;
        sequence1 = seed * ALEA_FRACTURE_FLOAT;
        seed = (seed * ALEA_MULTIPLIER + 1) >>> 0;
        sequence2 = seed * ALEA_FRACTURE_FLOAT;
        correction = ALEA_CORRECTION_DEFAULT;

        return seed;
    }

    /**
     * Returns a generated random unsigned float number
     *
     * @return {number} Generated number
     */
    function uFloat32() {
        const singleTerm =
            ALEA_TERM * sequence0 + correction * ALEA_FRACTURE_FLOAT;
        correction = singleTerm | 0;
        sequence0 = sequence1;
        sequence1 = sequence2;
        sequence2 = singleTerm - correction;
        return sequence2;
    }

    /**
     * Returns a generated random unsigned 32 integer
     *
     * @return {number} Generated number
     */
    function uInt32() {
        return (uFloat32() * ALEA_FRACTURE_INT) >>> 0;
    }

    /**
     * Get the internal sequence state
     *
     * @return {NumberGeneratorState} An object defining the internal state
     */
    function getState() {
        return {
            correction,
            sequence: [sequence0, sequence1, sequence2]
        };
    }

    /**
     * Set the internal sequence state
     *
     * @param {NumberGeneratorState} [state] An object defining the internal state
     */
    function setState(state) {
        const defaultState = {
            correction: ALEA_CORRECTION_DEFAULT,
            sequence: []
        };

        state = state || defaultState;
        state.sequence = state.sequence || [];

        correction = state.correction || ALEA_CORRECTION_DEFAULT;
        sequence0 = state.sequence[0] || 0;
        sequence1 = state.sequence[1] || 0;
        sequence2 = state.sequence[2] || 0;
    }

    setSeed(initialSeed === undefined ? 1 : initialSeed);

    return { setSeed, uFloat32, uInt32, getState, setState };
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
export function murmurHash(hash, seed = 1) {
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
}

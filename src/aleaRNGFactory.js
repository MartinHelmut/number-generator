/** @module number-generator/lib/aleaRNGFactory */
'use strict';

/**
 * Number generator state
 *
 * @typedef {Object} NumberGeneratorState
 * @property {number} correction Alea correction value
 * @property {number[]} sequence An 3-length array of sequences for generating numbers
 */

/**
 * @global
 * @namespace NumberGenerator
 */

/**
 * Set a seed for the generator
 *
 * @function setSeed
 * @memberof NumberGenerator
 * @param {number} seed The start seed to use for number generation
 * @return {number} Returns the defined seed
 */

/**
 * Get an unsigned 32 bit float
 *
 * @function uFloat32
 * @memberof NumberGenerator
 * @return {number} Returns an unsigned 32 bit float
 */

/**
 * Get an unsigned 32 bit integer
 *
 * @function uInt32
 * @memberof NumberGenerator
 * @return {number} Returns an unsigned 32 bit integer
 */

/**
 * Returns the current number generator state
 *
 * @function getState
 * @memberof NumberGenerator
 * @return {NumberGeneratorState} Returns the internal number generator state
 */

/**
 * Set a new number generator state
 *
 * @function setState
 * @memberof NumberGenerator
 * @param {NumberGeneratorState} [state={correction: 1, sequence: [0, 0, 0]}] A pre configured state object
 */

const ALEA_CORRECTION_DEFAULT = 1;
const START_SEQUENCE_0 = 0;
const START_SEQUENCE_1 = 0;
const START_SEQUENCE_2 = 0;
const ALEA_FRACTURE_FLOAT = 2.3283064365386963e-10; // 2^-32
const ALEA_FRACTURE_INT = 0x100000000; // 2^32
const ALEA_TERM = 2091639;
const ALEA_MULTIPLIER = 69069;

/**
 * Number generator with Alea algorithm
 *
 * From http://baagoe.com/en/RandomMusings/javascript/
 * Johannes Baagøe <baagoe@baagoe.com>, 2010
 * Refactored and extended from Martin Helmut Fieber <info@martin-fieber.de>
 *
 * @param {number} [initialSeed=1] Optional start seed number
 * @return {NumberGenerator} A number generator object
 */
export default function aleaRNGFactory(initialSeed) {
    let correction = ALEA_CORRECTION_DEFAULT;
    let sequence0 = START_SEQUENCE_0;
    let sequence1 = START_SEQUENCE_1;
    let sequence2 = START_SEQUENCE_2;

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
                `Expected seed to be an unsigned integer greater 1, but got "${seed}"`
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
     * @param {NumberGeneratorState} [state={correction: 1, sequence: [0, 0, 0]}] An object defining the internal state
     */
    function setState(state) {
        const defaultState = {
            correction: ALEA_CORRECTION_DEFAULT,
            sequence: [START_SEQUENCE_0, START_SEQUENCE_1, START_SEQUENCE_2]
        };

        state = state || defaultState;
        state.sequence = state.sequence || [];

        correction = state.correction || ALEA_CORRECTION_DEFAULT;
        sequence0 = state.sequence[0] || START_SEQUENCE_0;
        sequence1 = state.sequence[1] || START_SEQUENCE_1;
        sequence2 = state.sequence[2] || START_SEQUENCE_2;
    }

    setSeed(initialSeed === undefined ? 1 : initialSeed);

    return { setSeed, uFloat32, uInt32, getState, setState };
}

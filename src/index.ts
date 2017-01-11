export interface INumberGenerator {
    setSeed: (seed: number) => number;
    uFloat32: () => number;
    uInt32: () => number;
}

export type TNumberHashGenerator = (hash: string, seed: number) => number;

const ALEA_FRACTURE_FLOAT: number = 2.3283064365386963e-10; // 2^-32
const ALEA_FRACTURE_INT: number = 0x100000000; // 2^32
const ALEA_TERM: number = 2091639;
const ALEA_MULTIPLIER: number = 69069;
const MURMUR_MULTIPLIER: number = 0x5bd1e995;
const MURMUR_BASE: number = 24;

/**
 * Return an unsigned int32 from hash by position
 *
 * @param  hash     String hash value
 * @param  position String start position
 * @return          Unsigned int32
 */
function uInt32(hash: string, position: number): number {
    return (hash.charCodeAt(position++)) +
        (hash.charCodeAt(position++) << 8) +
        (hash.charCodeAt(position++) << 16) +
        (hash.charCodeAt(position) << 24);
}

/**
 * Return an unsigned int16 from hash by position
 *
 * @param  hash     String hash value
 * @param  position String start position
 * @return          Unsigned int16
 */
function uInt16(hash: string, position: number): number {
    return (hash.charCodeAt(position++)) + (hash.charCodeAt(position++) << 8);
}

/**
 * Returns a multiple unsigned int32
 *
 * @param  x Non linear base
 * @param  y Linear base
 * @return   Unsigned int32
 */
function uMul32(x: number, y: number): number {
    x = x | 0;
    y = y | 0;
    const nonLinear: number = x & 0xffff;
    const linearBase: number = x >>> 16;

    return ((nonLinear * y) + (((linearBase * y) & 0xffff) << 16)) | 0;
}

/**
 * Number generator with Alea algorithm
 *
 * From http://baagoe.com/en/RandomMusings/javascript/
 * Johannes Baagøe <baagoe@baagoe.com>, 2010
 * Ported and refactored in TypeScript from Martin Helmut Fieber <info@martin-fieber.de>
 *
 * @param  initialSeed Optional start seed number
 * @return             A number generator object
 */
export function aleaRNGFactory(initialSeed?: number): INumberGenerator {
    let sequence0: number = 0;
    let sequence1: number = 0;
    let sequence2: number = 0;
    let correction: number = 0;

    /**
     * Set the used seed number
     *
     * @throws TypeError Throws an exception if seed is float or negative
     * @param  seed      A number value
     * @return           The used number value
     */
    function setSeed(seed: number): number {
        if (seed % 1 !== 0 || seed <= 0) {
            throw new TypeError('Expected seed to be an unsigned integer greater 1');
        }

        sequence0 = (seed >>> 0) * ALEA_FRACTURE_FLOAT;
        seed = (seed * ALEA_MULTIPLIER + 1) >>> 0;
        sequence1 = seed * ALEA_FRACTURE_FLOAT;
        seed = (seed * ALEA_MULTIPLIER + 1) >>> 0;
        sequence2 = seed * ALEA_FRACTURE_FLOAT;
        correction = 1;

        return seed;
    }

    /**
     * Returns a generated random unsigned float number
     *
     * @return Generated number
     */
    function uFloat32(): number {
        const singleTerm: number = ALEA_TERM * sequence0 + correction * ALEA_FRACTURE_FLOAT;
        correction = singleTerm | 0;
        sequence0 = sequence1;
        sequence1 = sequence2;
        sequence2 = singleTerm - correction;
        return sequence2;
    }

    /**
     * Returns a generated random unsigned 32 integer
     *
     * @return Generated number
     */
    function uInt32(): number {
        return (uFloat32() * ALEA_FRACTURE_INT) >>> 0;
    }

    setSeed(initialSeed === undefined ? 1 : initialSeed);

    return { setSeed, uFloat32, uInt32 };
}

/**
 * Generate a non-cryptic number hash with murmur2 algorithm
 *
 * From https://gist.github.com/raycmorgan/588423
 * Ray Morgan, 2011
 * Ported and refactored in TypeScript from Martin Helmut Fieber <info@martin-fieber.de>
 *
 * @throws TypeError Throws an exception if seed is a float
 * @param  hash      The base string hash to generate number
 * @param  seed      An optional seed value
 * @return           Generated number
 */
export function murmurHash(hash: string, seed?: number): number {
    if (seed !== undefined && seed % 1 !== 0) {
        throw new TypeError('Expected seed to be an integer, float given');
    }

    let currentIndex: number = 0;
    let hashSum: number = seed ^ hash.length;
    let length: number = hash.length;

    while (length >= 4) {
        let calculated: number = uInt32(hash, currentIndex);

        calculated = uMul32(calculated, MURMUR_MULTIPLIER);
        calculated ^= calculated >>> MURMUR_BASE;
        calculated = uMul32(calculated, MURMUR_MULTIPLIER);

        hashSum = uMul32(hashSum, MURMUR_MULTIPLIER);
        hashSum ^= calculated;

        currentIndex += 4;
        length -= 4;
    }

    switch (length) {
        case 3:
            hashSum ^= uInt16(hash, currentIndex);
            hashSum ^= hash.charCodeAt(currentIndex + 2) << 16;
            hashSum = uMul32(hashSum, MURMUR_MULTIPLIER);
            break;
        case 2:
            hashSum ^= uInt16(hash, currentIndex);
            hashSum = uMul32(hashSum, MURMUR_MULTIPLIER);
            break;
        case 1:
            hashSum ^= hash.charCodeAt(currentIndex);
            hashSum = uMul32(hashSum, MURMUR_MULTIPLIER);
            break;
        default:
            hashSum = 0;
    }

    hashSum ^= hashSum >>> 13;
    hashSum = uMul32(hashSum, MURMUR_MULTIPLIER);
    hashSum ^= hashSum >>> 15;

    return hashSum >>> 0;
}

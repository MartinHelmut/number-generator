/**
 * Returns a multiple unsigned int32
 *
 * @private
 * @param {number} x Non linear base
 * @param {number} y Linear base
 * @return {number} Unsigned int32
 */
export function uMul32Getter(x, y) {
    x = x | 0;
    y = y | 0;
    const nonLinear = x & 0xffff;
    const linearBase = x >>> 16;

    return (nonLinear * y + (((linearBase * y) & 0xffff) << 16)) | 0;
}

/**
 * Return an unsigned int32 from hash by position
 *
 * @private
 * @param {string} hash String hash value
 * @param {number} position String start position
 * @return {number} Unsigned int32
 */
export function uInt32Getter(hash, position) {
    return (
        hash.charCodeAt(position++) +
        (hash.charCodeAt(position++) << 8) +
        (hash.charCodeAt(position++) << 16) +
        (hash.charCodeAt(position) << 24)
    );
}

/**
 * Throw an error if the given seed is invalid for a murmur hash algorithm
 *
 * @private
 * @param {number} seed A number value representing the seed
 */
export function throwInvalidMurmurSeed(seed) {
    if (seed !== undefined && seed % 1 !== 0) {
        throw new TypeError("Expected seed to be an integer, float given");
    }
}

/**
 * Throw an error if the given seed is invalid for the alea algorithm
 *
 * @private
 * @param {number} seed A number value representing the seed
 */
export function throwInvalidAleaSeed(seed) {
    if (seed % 1 !== 0 || seed <= 0) {
        throw new TypeError(
            `Expected seed to be an unsigned integer greater 1, but got "${seed}"`
        );
    }
}

/**
 * Throw an error if a given hash is not a string
 *
 * @private
 * @param {string} hash The possible empty hash value
 * @param {string} [functionName] An optional function to enhance the error message
 */
export function throwInvalidStringHash(hash, functionName = "") {
    if (typeof hash !== "string") {
        const errorMessagePrefix = functionName ? `${functionName}() ` : "";
        throw new TypeError(
            `${errorMessagePrefix}first argument is not a string.`
        );
    }
}

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
 * @param {Uint8Array} bytes UTF8 string as array
 * @param {number} position String start position
 * @return {number} Unsigned int32
 */
export function uInt32Getter(bytes, position) {
  return (
    bytes[position++] +
    (bytes[position++] << 8) +
    (bytes[position++] << 16) +
    (bytes[position++] << 24)
  );
}

/**
 * Mix hash for x86
 *
 * @private
 * @param {number} hash Base number hash
 * @returns {number} Mixed number hash
 */
export function uInt32mix(hash) {
  hash ^= hash >>> 16;
  hash = uMul32Getter(hash, 0x85ebca6b);
  hash ^= hash >>> 13;
  hash = uMul32Getter(hash, 0xc2b2ae35);
  hash ^= hash >>> 16;

  return hash;
}

/**
 * Returns the int32 rotated left by the number of positions
 *
 * @private
 * @param {number} x Unsigned int32
 * @param {number} y Number representing bit positions
 * @returns {number}
 */
export function uInt32RotateLeft(x, y) {
  return (x << y) | (x >>> (32 - y));
}

/**
 * Create concated and filled hash string
 *
 * @private
 * @param {[number, number, number, number]} hash Array containing hash parts as int
 * @returns {string} Concatenated and filled hash
 */
export function createConcatenatedHash([h1, h2, h3, h4]) {
  const fill = "00000000";
  return (
    (fill + (h1 >>> 0).toString(16)).slice(-8) +
    (fill + (h2 >>> 0).toString(16)).slice(-8) +
    (fill + (h3 >>> 0).toString(16)).slice(-8) +
    (fill + (h4 >>> 0).toString(16)).slice(-8)
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
      `Expected seed to be an unsigned integer greater or equal 1, but got "${seed}"`
    );
  }
}

/**
 * Throw an error if a given hash is not a string
 *
 * @private
 * @param {string} hash The possible empty hash value
 * @param {string} functionName A function name to enhance the error message
 */
export function throwInvalidStringHash(hash, functionName) {
  if (typeof hash !== "string") {
    throw new TypeError(`${functionName}(): first argument is not a string.`);
  }
}

/**
 * Encode non regular ASCII characters in string to array of chars
 *
 * @private
 * @param {string} str Encode a string into a Uint8 array
 * @returns {Uint8Array}
 */
function encode(str) {
  const length = str.length;
  let resPos = -1;

  // The Uint8Array's length must be at least 3x the length of the string because an invalid UTF-16
  // takes up the equivalent space of 3 UTF-8 characters to encode it properly. However, Array's
  // have an auto expanding length and 1.5x should be just the right balance for most uses.
  const resultArray = new Uint8Array(length * 3);
  let i = 0;

  while (i !== length) {
    let point = str.charCodeAt(i);
    i += 1;

    if (point >= 0xd800 && point <= 0xdbff) {
      if (i === length) {
        resultArray[(resPos += 1)] = 0xef; // 0b11101111
        resultArray[(resPos += 1)] = 0xbf; // 0b10111111
        resultArray[(resPos += 1)] = 0xbd; // 0b10111101
        break;
      }
      // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      const nextCode = str.charCodeAt(i);

      if (nextCode >= 0xdc00 && nextCode <= 0xdfff) {
        point = (point - 0xd800) * 0x400 + nextCode - 0xdc00 + 0x10000;
        i += 1;

        if (point > 0xffff) {
          // point > 65535
          resultArray[(resPos += 1)] = (0x1e /*0b11110*/ << 3) | (point >>> 18);
          resultArray[(resPos += 1)] =
            (0x2 /*0b10*/ << 6) | ((point >>> 12) & 0x3f); // 0b00111111
          resultArray[(resPos += 1)] =
            (0x2 /*0b10*/ << 6) | ((point >>> 6) & 0x3f); // 0b00111111
          resultArray[(resPos += 1)] = (0x2 /*0b10*/ << 6) | (point & 0x3f); // 0b00111111
          continue;
        }
      } else {
        resultArray[(resPos += 1)] = 0xef; // 0b11101111
        resultArray[(resPos += 1)] = 0xbf; // 0b10111111
        resultArray[(resPos += 1)] = 0xbd; // 0b10111101
        continue;
      }
    }

    if (point <= 0x007f) {
      resultArray[(resPos += 1)] = (0x0 /*0b0*/ << 7) | point;
    } else if (point <= 0x07ff) {
      resultArray[(resPos += 1)] = (0x6 /*0b110*/ << 5) | (point >>> 6);
      resultArray[(resPos += 1)] = (0x2 /*0b10*/ << 6) | (point & 0x3f); // 0b00111111
    } else {
      resultArray[(resPos += 1)] = (0xe /*0b1110*/ << 4) | (point >>> 12);
      resultArray[(resPos += 1)] = (0x2 /*0b10*/ << 6) | ((point >>> 6) & 0x3f); // 0b00111111
      resultArray[(resPos += 1)] = (0x2 /*0b10*/ << 6) | (point & 0x3f); // 0b00111111
    }
  }

  return resultArray.subarray(0, resPos + 1);
}

/**
 * Convert string to array of UTF 8 bytes
 *
 * @private
 * @param {string} str String to convert
 * @returns {Uint8Array} Encoded UTF8 chars
 */
export function toUtf8Bytes(str) {
  const result = new Uint8Array(str.length);

  for (let i = 0; i < str.length; i += 1) {
    const charCode = str.charCodeAt(i);
    if (charCode < 0 || charCode > 127) {
      return encode(str);
    }
    result[i] = charCode;
  }

  return result;
}

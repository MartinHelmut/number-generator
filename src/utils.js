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
 * @param {number[]} bytes UTF8 number array string representation
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
 * @param {string} functionName A function name to enhance the error message
 */
export function throwInvalidStringHash(hash, functionName) {
  if (typeof hash !== "string") {
    throw new TypeError(`${functionName}(): first argument is not a string.`);
  }
}

/**
 * Get a new TextEncoder instance
 *
 * @private
 * @return {TextEncoder|(TextEncoder|module:util.TextEncoder)}
 */
export function createTextEncoder() {
  const isNodeEnv = Boolean(typeof module !== "undefined" && module.exports);

  if (typeof TextEncoder !== "undefined" || isNodeEnv) {
    const Encoder = TextEncoder || require("util").TextEncoder;
    return new Encoder();
  }

  class TextEncoder {
    encode(str) {
      const length = str.length;
      let resPos = -1;

      // The Uint8Array's length must be at least 3x the length of the string because an invalid UTF-16
      // takes up the equivalent space of 3 UTF-8 characters to encode it properly. However, Array's
      // have an auto expanding length and 1.5x should be just the right balance for most uses.
      const resultArray = new Uint8Array(length * 3);

      for (let point = 0, nextcode = 0, i = 0; i !== length; ) {
        point = str.charCodeAt(i);
        i += 1;

        if (point >= 0xd800 && point <= 0xdbff) {
          if (i === length) {
            resultArray[(resPos += 1)] = 0xef /*0b11101111*/;
            resultArray[(resPos += 1)] = 0xbf /*0b10111111*/;
            resultArray[(resPos += 1)] = 0xbd /*0b10111101*/;
            break;
          }
          // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          nextcode = str.charCodeAt(i);

          if (nextcode >= 0xdc00 && nextcode <= 0xdfff) {
            point = (point - 0xd800) * 0x400 + nextcode - 0xdc00 + 0x10000;
            i += 1;

            if (point > 0xffff) {
              resultArray[(resPos += 1)] =
                (0x1e /*0b11110*/ << 3) | (point >>> 18);
              resultArray[(resPos += 1)] =
                (0x2 /*0b10*/ << 6) | ((point >>> 12) & 0x3f) /*0b00111111*/;
              resultArray[(resPos += 1)] =
                (0x2 /*0b10*/ << 6) | ((point >>> 6) & 0x3f) /*0b00111111*/;
              resultArray[(resPos += 1)] =
                (0x2 /*0b10*/ << 6) | (point & 0x3f) /*0b00111111*/;
              continue;
            }
          } else {
            resultArray[(resPos += 1)] = 0xef /*0b11101111*/;
            resultArray[(resPos += 1)] = 0xbf /*0b10111111*/;
            resultArray[(resPos += 1)] = 0xbd /*0b10111101*/;
            continue;
          }
        }

        if (point <= 0x007f) {
          resultArray[(resPos += 1)] = (0x0 /*0b0*/ << 7) | point;
        } else if (point <= 0x07ff) {
          resultArray[(resPos += 1)] = (0x6 /*0b110*/ << 5) | (point >>> 6);
          resultArray[(resPos += 1)] =
            (0x2 /*0b10*/ << 6) | (point & 0x3f) /*0b00111111*/;
        } else {
          resultArray[(resPos += 1)] = (0xe /*0b1110*/ << 4) | (point >>> 12);
          resultArray[(resPos += 1)] =
            (0x2 /*0b10*/ << 6) | ((point >>> 6) & 0x3f) /*0b00111111*/;
          resultArray[(resPos += 1)] =
            (0x2 /*0b10*/ << 6) | (point & 0x3f) /*0b00111111*/;
        }
      }

      return resultArray.subarray(0, resPos + 1);
    }
  }

  return new TextEncoder();
}

/**
 * Convert string to array of UTF 8 bytes
 *
 * @private
 * @param {string} str String to convert
 * @returns {number[]} Array with encoded UTF8 chars
 */
export function toUtf8Bytes(str) {
  const textEncoder = createTextEncoder();
  const result = [];

  if (!str) return result;

  for (let i = 0; i < str.length; i += 1) {
    const charCode = str.charCodeAt(i);
    if (charCode < 0 || charCode > 127) {
      return textEncoder.encode(str);
    }
    result.push(charCode);
  }

  return result;
}

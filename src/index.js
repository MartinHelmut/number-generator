/** @module number-generator */
'use strict';

import aleaRNGFactory from './aleaRNGFactory';
import murmurhash2_x86_32 from './murmurhash2_x86_32';
import murmurhash3_x86_32 from './murmurhash3_x86_32';

// Compatibility to v1
const murmurHash = murmurhash2_x86_32;

export { aleaRNGFactory, murmurhash2_x86_32, murmurHash, murmurhash3_x86_32 };

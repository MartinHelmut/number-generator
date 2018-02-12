/** @module number-generator */
'use strict';

const aleaRNGFactory = require('./aleaRNGFactory');
const murmurhash2_x86_32 = require('./murmurhash2_x86_32');

exports.aleaRNGFactory = aleaRNGFactory;
exports.murmurhash2_x86_32 = murmurhash2_x86_32;
exports.murmurHash = murmurhash2_x86_32; // Compatibility to v1

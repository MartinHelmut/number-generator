/** @module number-generator */
"use strict";

import aleaRNGFactory from "./fns/aleaRNGFactory";
import murmurhash2_x86_32 from "./fns/murmurhash2_x86_32";
import murmurhash3_x86_32 from "./fns/murmurhash3_x86_32";
import murmurhash3_x86_128 from "./fns/murmurhash3_x86_128";
import murmurhash3_x64_128 from "./fns/murmurhash3_x64_128";

export {
  aleaRNGFactory,
  murmurhash2_x86_32,
  murmurhash3_x86_32,
  murmurhash3_x86_128,
  murmurhash3_x64_128
};

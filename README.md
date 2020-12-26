# Number Generator

[![npm][npmimg]][npmurl]
[![Build Status][travisimg]][travisorg]
[![Coverage Status][covimg]][covurl]
[![Commitizen friendly][czimg]][czcli]
[![Standard Version][stdimg]][stdurl]
[![styled with prettier][prtimg]][prturl]

Generate repeatable pseudo random numbers and non-cryptographic hash numbers for usage in Node.js (>= 8) and browser environments (major browsers and IE >= 10).

## Contents

- [Update to version 4](#update-to-version-4)
- [Usage](#usage)
  - [Install](#install)
  - [Random numbers](#random-numbers)
    - [Create a new random number generator](#create-a-new-random-number-generator)
    - [Create an unsigned integer](#create-an-unsigned-integer)
    - [Create an unsigned float](#create-an-unsigned-float)
    - [Change the seed](#change-the-seed)
    - [Get and restore the state](#get-and-restore-the-state)
    - [Something like Math.random?](#something-like-mathrandom)
  - [Murmur hash](#murmur-hash)
    - [Basic hash generation](#basic-hash-generation)
    - [Hash based on different seeds](#hash-based-on-different-seeds)
  - [TypeScript](#typescript)
  - [Support](#support)
  - [Benchmarks](#benchmarks)
    - [aleaRNGFactory](#alearngfactory)
    - [murmurhash](#murmurhash)
- [Development](#development)
- [Disclaimer](#disclaimer)

---

## Update to version 4

- Change `murmurHash` to `murmurhash2_x86_32` (same function since v2, alias now removed).
- Non ASCII characters (e.g. chinese or emoji) are now handled properly. This can produce different results if these characters where used before inside an input hash for all murmur hash functions.

## Usage

This library (**7.55 KB, gzipped size: 2.84 KB**) contains the following methods: one PRNG (pseudo random number generator) called _Alea_ and four number hash generators, _MurmurHash2_ and _MurmurHash3_ for 32 and 128 bit (x86 and x64) hash strings.

More about the hash function _MurmurHash_ can be found [here on wikipedia][mur].

### Install

Based on your package manager you can install it via:

```bash
# NPM
npm install number-generator

# Yarn
yarn add number-generator

# pnpm
pnpm add number-generator
```

After that you can import it either as a library, e.g.:

```javascript
// ESM
import * as numberGenerator from "number-generator";

// CJS
const numberGenerator = require("number-generator");
```

Or as single functions:

```javascript
// ESM
import aleaRNGFactory from "number-generator/lib/aleaRNGFactory";
import murmurhash2_x86_32 from "number-generator/lib/murmurhash2_x86_32";
import murmurhash3_x86_32 from "number-generator/lib/murmurhash3_x86_32";
import murmurhash3_x86_128 from "number-generator/lib/murmurhash3_x86_128";
import murmurhash3_x64_128 from "number-generator/lib/murmurhash3_x64_128";

// CJS
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const murmurhash2_x86_32 = require("number-generator/lib/murmurhash2_x86_32");
const murmurhash3_x86_32 = require("number-generator/lib/murmurhash3_x86_32");
const murmurhash3_x86_128 = require("number-generator/lib/murmurhash3_x86_128");
const murmurhash3_x64_128 = require("number-generator/lib/murmurhash3_x64_128");
```

Also the library can safely be [tree shaked][trsh]. If tree shaking is used in e.g. Rollup or Webpack this will only put the used function with helpers in your bundle:

```javascript
import { aleaRNGFactory } from "number-generator";
```

For use with TypeScript take a look at the [usage with typescript section](#typescript) of this document.

**Remark:** For direct browser usage you can use the exposed `numberGenerator` global, e.g.:

```javascript
// Direct browser usage e.g.:
numberGenerator.murmurhash2_x86_32("something");
```

All supported environments are listed under the [support section](#support).

### Random numbers

You can use the `aleaRNGFactory` method to generate (pseudo) random numbers based an a seed (**default seed is** `1`). Every seed produces the same result for the created getter method.

⚠️ **Attention:** The default seed `1` should not be used! It produces one duplicate at 4370 calls. This can be avoided by using a seed larger or equal to 2. Nevertheless, this is still included in the library to not break applications using the default behavior.

#### Create a new random number generator

First step is to [include the library](#install) functions you want to use in your application. If you only want to use the Alea implementation you can import it directly:

```javascript
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
```

Now you can create a new generator by calling the function with a seed **equal or larger to 2**. The number `0`, float or negative numbers are not valid and will throw a `TypeError`. See the remark [at the beginning of this section](#random-numbers) on why to avoid 1 as a seed.

```javascript
// Valid:
const generator1 = aleaRNGFactory(2);
const generator2 = aleaRNGFactory(4836325);

// Invalid:
const notValidGen1 = aleaRNGFactory(0);
const notValidGen2 = aleaRNGFactory(0.47);
const notValidGen3 = aleaRNGFactory(-1);
```

#### Create an unsigned integer

If you have a valid generator object you can use the `uInt32` method to get a random unsigned integer. Call it multiple times to get new numbers.

```javascript
const { uInt32 } = aleaRNGFactory(10);
uInt32(); // 20916391
uInt32(); // 1567221093
```

This will create the exact **same result on your machine**! You will always get the same value for the same seed.

This means if you create multiple generators with the same seed, you get the same result for the n-th call:

```javascript
const generator1 = aleaRNGFactory(2);
const generator2 = aleaRNGFactory(2);

const value1 = generator1.uInt32();
const value2 = generator2.uInt32();

value1 === value2; // true
```

#### Create an unsigned float

The same that works for [the uInt32 method](#create-an-unsigned-integer) applies to the `uFloat32` method, but this time you get an unsigned float.

```javascript
const { uFloat32 } = aleaRNGFactory(5);
uFloat32(); // 0.0024349885061383247
uFloat32(); // 0.1826920467428863
```

Again, this will create the exact **same result on your machine**!

If you create multiple generators with the same seed, you get the same result for the n-th call:

```javascript
const generator1 = aleaRNGFactory(4);
const generator2 = aleaRNGFactory(4);

const value1 = generator1.uFloat32();
const value2 = generator2.uFloat32();

value1 === value2; // true
```

#### Change the seed

You can change the seed used by the generator object with the `setSeed` method.

```javascript
const generator = aleaRNGFactory(2);

// Get some random numbers
generator.uInt32();
generator.uInt32();

// Change seed
generator.setSeed(3);

// Get some more random numbers
generator.uInt32();
generator.uInt32();
```

#### Get and restore the state

You can get and restore the internal state with `getState` and `setState`.

```javascript
const generator = aleaRNGFactory(42);
generator.uInt32();
generator.uInt32();
const state = generator.getState(); // Get the generator state
const value1 = generator.uInt32();
generator.uInt32();
generator.uInt32();
generator.setState(state); // Restore the previous state
const value2 = generator.uInt32();

value1 === value2; // true
```

For TypeScript the state interface is `NumberGeneratorState`.

```typescript
import { aleaRNGFactory, NumberGeneratorState } from "number-generator";

const generator = aleaRNGFactory(2);
generator.uInt32();

const state: NumberGeneratorState = generator.getState();
```

You can set the state with `setState` on two ways. Either you don't pass any parameter to the state function, where it will reset the state to the initial state. Or you can pass a state object to restore a previous state:

```javascript
const generator = aleaRNGFactory(2);
generator.uInt32();

const state = generator.getState();
generator.setState(); // Reset the state
generator.uInt32(); // Get a new value

generator.setState(state); // Restore saved state
```

#### Something like Math.random?

If you want something similar to `Math.random()` (without generating duplicated values) you can use the [JavaScript Date API][date] with a timestamp and combine it with the `uFloat32` method from the `aleaRNGFactory` e.g.:

```javascript
const { uFloat32: random } = aleaRNGFactory(Date.now());

// Get a random float number
random();
```

### Murmur hash

To generate a hash there are four functions, `murmurhash2_x86_32`, `murmurhash3_x86_32`, `murmurhash3_x86_128` and `murmurhash3_x64_128`. The "murmur hash" functions implement the [MurmurHash algorithm for 32 and 128 bit][mur] in JavaScript (murmurhash2 and 3) for x86 and x64. They take a string and generate a non-cryptographic hash number as unsigned integer with 32 bit or a string hash with 128 bit.

You can import the functions directly:

```javascript
const murmurhash2_x86_32 = require("number-generator/lib/murmurhash2_x86_32");
const murmurhash3_x86_32 = require("number-generator/lib/murmurhash3_x86_32");
const murmurhash3_x86_128 = require("number-generator/lib/murmurhash3_x86_128");
const murmurhash3_x64_128 = require("number-generator/lib/murmurhash3_x64_128");
```

Both `murmurhash2_x86_32` and `murmurhash3_x86_32` will generate a unsigned 32 bit number. The `murmurhash3_x86_128` and `murmurhash3_x64_128` functions will generate a 128 bit string. To showcase the difference:

```javascript
murmurhash2_x86_32("Hello"); // 1826530862
murmurhash3_x86_32("Hello"); // 316307400
murmurhash3_x86_128("Hello"); // "2360ae465e6336c6ad45b3f4ad45b3f4"
murmurhash3_x64_128("Hello"); // "35b974ff55d4c41ca000eacf29125544"
```

#### Basic hash generation

All murmur hash functions work the same. So the following examples will take the murmur hash 2 function to demonstrate the usage. To use it pass a string to generate the hash number. The default seed used is `0`.

```javascript
const hash1 = murmurhash2_x86_32("My string.");
const hash2 = murmurhash2_x86_32("My string.", 0);

hash1; // 1836966117
hash1 === hash2; // true
```

This will create the exact **same result on your machine**!

#### Hash based on different seeds

Different seeds generate different results for the same input string. **Only whole numbers are valid seeds** for any murmur hash function!

```javascript
const hash1 = murmurhash2_x86_32("My string.", 1);
const hash2 = murmurhash2_x86_32("My string.", 2);

hash1 === hash2; // false
```

A float number as a seed throws a `TypeError`:

```javascript
const hash = murmurhash2_x86_32("My string.", 0.7); // TypeError!
```

### TypeScript

This package contains all the type definitions for TypeScript. Every murmur hash function implements the `NumberHashGenerator` interface.

```typescript
import {
  NumberGenerator,
  NumberHashGenerator,
  aleaRNGFactory,
  murmurhash2_x86_32,
  murmurhash3_x86_32,
} from "number-generator";

const generator: NumberGenerator = aleaRNGFactory(2);
// const factory: () => NumberGenerator = aleaRNGFactory;

const hashFn1: NumberHashGenerator = murmurhash2_x86_32;
const hashFn2: NumberHashGenerator = murmurhash3_x86_32;

generator.uInt32();
hashFn1("What?", 42);
hashFn2("something", 14);
```

### Support

This library was tested on the following environments:

- Node >= 8
- All major browsers and IE >= 10

### Benchmarks

**Disclaimer:** The following benchmarks were created on a MacBook Pro, Processor 2,7 GHz Intel Core i5 with 8 GB 1867 MHz DDR3 memory and run under Node v12.14.1.

#### aleaRNGFactory

Comparison between `uInt32` and `uFloat32` methods:

```
// v4.0.1
aleaRNGFactory#uInt32()   x 23,094,220 ops/sec
aleaRNGFactory#uFloat32() x 20,571,821 ops/sec
```

#### murmurhash

Comparison between `murmurhash2_x86_32`, `murmurhash3_x86_32`, `murmurhash3_x86_128` and `murmurhash3_x64_128` function:

```
// v4.0.1
murmurhash2_x86_32  x 834,241 ops/sec
murmurhash3_x86_32  x 827,462 ops/sec
murmurhash3_x86_128 x 300,153 ops/sec
murmurhash3_x64_128 x 188,581 ops/sec
```

To run them on your machine execute `pnpm run test:benchmark`.

## Development

If you want to contribute see the [CONTRIBUTING.md][cont]

## Disclaimer

"Why pseudo random number generators and number hash functions" you may ask? Read more in [this fantastic blog post][unit] about "A primer on repeatable random numbers" from Rune Skovbo Johansen.

Thanks to Johannes Baagøe for the Alea port and Ray Morgan for the MurmurHash2 algorithm implementation in JavaScript. Also thanks to Karan Lyons for the [MurmurHash3 implementation][mur3].

Resources used to tests against implementations in other languages are:

- JSON for modern C++ by Niels Lohmann: https://github.com/nlohmann/json
- MurmurHash2 and 3 in C++ by Austin Appleby: https://github.com/aappleby/smhasher

Big thanks as well to Alex Ciminian for raising the issue with non ASCII characters: https://cimi.io/murmurhash3js-revisited/

[npmurl]: https://www.npmjs.com/package/number-generator
[npmimg]: https://img.shields.io/npm/v/number-generator.svg
[travisimg]: https://travis-ci.com/MartinHelmut/number-generator.svg?branch=main
[travisorg]: https://travis-ci.com/MartinHelmut/number-generator
[covimg]: https://coveralls.io/repos/github/MartinHelmut/number-generator/badge.svg?branch=main
[covurl]: https://coveralls.io/github/MartinHelmut/number-generator?branch=main
[czimg]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[czcli]: http://commitizen.github.io/cz-cli/
[stdimg]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg
[stdurl]: https://github.com/conventional-changelog/standard-version
[prtimg]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
[prturl]: https://github.com/prettier/prettier
[ts]: http://www.typescriptlang.org/
[wal]: https://web.archive.org/web/20111118012238/http://baagoe.com/en/RandomMusings/javascript/
[brnm]: https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
[date]: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date
[mur]: https://en.wikipedia.org/wiki/MurmurHash
[mur3]: https://github.com/karanlyons/murmurHash3.js
[cont]: https://github.com/MartinHelmut/number-generator/blob/master/CONTRIBUTING.md
[unit]: https://blogs.unity3d.com/2015/01/07/a-primer-on-repeatable-random-numbers/
[trsh]: https://en.wikipedia.org/wiki/Tree_shaking

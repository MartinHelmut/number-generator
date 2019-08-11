# Number Generator

[![npm][npmimg]][npmurl]
[![Build Status][travisimg]][travisorg]
[![Coverage Status][covimg]][covurl]
[![Commitizen friendly][czimg]][czcli]
[![Standard Version][stdimg]][stdurl]
[![styled with prettier][prtimg]][prturl]

Generate repeatable pseudo random numbers and non-cryptographic hash numbers for usage in Node.js and browser environments.

## Contents

- [Version update](#version-update)
- [Usage](#usage)
  - [Install](#install)
  - [Random numbers](#random-numbers)
    - [Create a new random number generator](#create-a-new-random-number-generator)
    - [Create an unsigned integer](#create-an-unsigned-integer)
    - [Create an unsigned float](#create-an-unsigned-float)
    - [Change the seed](#change-the-seed)
    - [Get the state](#get-the-state)
    - [Set the state](#set-the-state)
    - [Something like Math.random?](#something-like-mathrandom)
  - [Generate hash](#generate-hash)
    - [Basic hash generation](#basic-hash-generation)
    - [Hash based on different seeds](#hash-based-on-different-seeds)
    - [Compatibility to v1](#compatibility-to-v1)
  - [TypeScript](#typescript)
  - [Support](#support)
- [Development](#development)
- [Disclaimer](#disclaimer)

---

## Version update

**Note on updating from v1 or v2 to v3:** It can safely be done 🥳. Compatibility is restored for all versions so that nothing breaks on a major version bump.

## Usage

This library (**2.51 KB, gzipped size: 1.12 KB**) contains the following methods: one PRNG (pseudo random number generator) called _Alea_ and two number hash generators, _MurmurHash2_ and _MurmurHash3_, for unsigned integer with 32bit. The _Alea_ implementation is originally from Johannes Baagøe. Johannes Baagøe site is offline but here is a [Web Archive Link][wal] or alternatively a [direct mirror of Johannes Baagøe's wiki from Nick Quinlan][brnm].

More about the hash function _MurmurHash_ can be found [here on wikipedia][mur].

### Install

Based on your package manager you can install it via:

```bash
# NPM
npm install number-generator

# Yarn
yarn add number-generator

# pnpm
pnpm install number-generator
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

// CJS
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const murmurhash2_x86_32 = require("number-generator/lib/murmurhash2_x86_32");
const murmurhash3_x86_32 = require("number-generator/lib/murmurhash3_x86_32");
```

Also because the library can safely be [tree shaked][trsh] you can import the functions for ESM like:

```javascript
// If tree shaking is used in e.g. Rollup or Webpack this
// will only put the used function with helpers in your bundle:
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

**Attention:** The default seed `1` should not be used! It produces one duplicate at 4370 calls. This can be avoided by using a seed larger or equal to 2.

#### Create a new random number generator

First step is to [include the library](#install) functions you want to use in your application. If you only want to use the Alea implementation you can import it directly by:

```javascript
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
```

Now you can create a new generator by calling the function with a seed **equal or larger to 2**. The number `0`, float or negative numbers are not valid and will throw a `TypeError`.

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

This will create the exact **same result on your machine**! You get always the same values for the same seed used.

This means if you create multiple generators with the same seed, you get the same result for the n-th call:

```javascript
const generator1 = aleaRNGFactory(2);
const generator2 = aleaRNGFactory(2);

const value1 = generator1.uInt32();
const value2 = generator2.uInt32();

value1 === value2; // true
```

#### Create an unsigned float

The same that works for [the uInt32 method](#create-an-unsigned-integer) applies to the `uFloat32` method. But this time you get an unsigned float.

```javascript
const { uFloat32 } = aleaRNGFactory(5);
uFloat32(); // 0.0024349885061383247
uFloat32(); // 0.1826920467428863
```

Again, this should create the exact **same result on your machine**!

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

#### Get the state

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

#### Set the state

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

If you want something similar to `Math.random()` (without duplicate values) you can use the [JavaScript Date API][date] with a timestamp and combine it with the `uFloat32` method from the `aleaRNGFactory` e.g.:

```javascript
const { uFloat32: random } = aleaRNGFactory(Date.now());

// Get a random float number
random();
```

### Generate hash

To generate a number hash there are two functions, `murmurhash2_x86_32` and `murmurhash3_x86_32`. The `murmurhash` functions implement the [MurmurHash algorithm for 32bit integer][mur] in JavaScript (murmurhash2 and 3). They take a string and generate a non-cryptographic hash number as unsigned integer with 32bit.

You can import the functions directly:

```javascript
const murmurhash2_x86_32 = require("number-generator/lib/murmurhash2_x86_32");
// or
const murmurhash3_x86_32 = require("number-generator/lib/murmurhash3_x86_32");
```

#### Basic hash generation

All murmur hash functions work the same. So the following examples will take the murmur hash 2 function to demonstrate the usage. To use it pass a string to generate the hash number. The default seed used is `0`.

```javascript
const hash1 = murmurhash2_x86_32("My string.");
const hash2 = murmurhash2_x86_32("My string.", 0);

hash1; // 1836966117
hash1 === hash2; // true
```

This should create the exact **same result on your machine**!

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

#### Compatibility to v1

To ensure compatibility to version 1 of this library, the `murmurhash2_x86_32` is also exposed as `murmurHash` function and can be used by importing it from the library:

```javascript
const { murmurHash } = require("number-generator");
```

### TypeScript

This package contains all the type definitions for TypeScript. Every murmur hash function implements the `NumberHashGenerator` interface.

```typescript
import {
  NumberGenerator,
  NumberHashGenerator,
  aleaRNGFactory,
  murmurhash2_x86_32,
  murmurhash3_x86_32
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

Exceptions for Node are versions that reached the End-of-Life as defined under https://github.com/nodejs/Release#end-of-life-releases.

## Development

If you want to contribute see the [CONTRIBUTING.md][cont]

## Disclaimer

"Why pseudo random number generators and number hash functions" you may ask? Read more in [this fantastic blog post][unit] about "A primer on repeatable random numbers" from Rune Skovbo Johansen.

Thanks to Johannes Baagøe for the Alea port and Ray Morgan for the MurmurHash2 algorithm implementation in JavaScript. Also thanks to Karan Lyons for the [MurmurHash3 implementation][mur3].

[npmurl]: https://www.npmjs.com/package/number-generator
[npmimg]: https://img.shields.io/npm/v/number-generator.svg
[travisimg]: https://travis-ci.org/MartinHelmut/number-generator.svg?branch=master
[travisorg]: https://travis-ci.org/MartinHelmut/number-generator
[covimg]: https://coveralls.io/repos/github/MartinHelmut/number-generator/badge.svg?branch=master
[covurl]: https://coveralls.io/github/MartinHelmut/number-generator?branch=master
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

# Number Generator

[![npm][npmimg]][npmurl]
[![Build Status][travisimg]][travisorg]
[![Coverage Status][covimg]][covurl]
[![Commitizen friendly][czimg]][czcli]
[![Standard Version][stdimg]][stdurl]
[![styled with prettier][prtimg]][prturl]

Generate repeatable pseudo random numbers and non-cryptographic hash
numbers with Node.js and browser.

**This library is not yet suitable for production!** Wait until major
release v1.0.0 for a stable API.

## Contents

* [Usage](#usage)
  * [Install](#install)
  * [Random numbers](#random-numbers)
    * [Create a new random number generator](#create-a-new-random-number-generator)
    * [Create an unsigned integer](#create-an-unsigned-integer)
    * [Create an unsigned float](#create-an-unsigned-float)
    * [Change the seed](#change-the-seed)
    * [Get the state](#get-the-state)
    * [Set the state](#set-the-state)
    * [Something like Math.random?](#something-like-math-random)
  * [Generate hash](#generate-hash)
  * [TypeScript](#typescript)
* [Development](#development)
  * [Run tests](#run-tests)
  * [Build the library](#build-the-library)
* [Disclaimer](#disclaimer)

* * *

## Usage

This small library contains two methods, the random number generator called
*Alea* and a number hash generator named *MurmurHash2*. The *Alea*
implementation is originally from Johannes Baagøe and ported to [TypeScript][ts]
from me. Johannes Baagøe site is offline but here is a [Web Archive Link][wal].
You can read more about the hash function *MurmurHash2*
[here][mur].

### Install

Just use NPM or Yarn to install the package:

```shell
npm install --save number-generator
# or
yarn add number-generator
```

After that you can import it how you like, e.g.:

```javascript
// ES2015
import { aleaRNGFactory, murmurHash } from 'number-generator';

// Node.js < 6.0.0
var prng = require('number-generator'); // => prng.murmurHash(...)

// Node.js >= 6.0.0
const { aleaRNGFactory, murmurHash } = require('number-generator');
```

For use with TypeScript take a look at [this readme chapter](#typescript).

**Remark:** There is no global namespace exposed for the browser! You have
to bundle your dependencies to use the library in current browser environments.

### Random numbers

You can use the `aleaRNGFactory` method to generate (pseudo) random numbers
based an a seed (**default seed is** `1`). Every seed let you produce the
same result for the number getter methods.

#### Create a new random number generator

First step is to [include the library](#install) functions you want use
in your application the way you want.

Now you can create a new generator with the random seed `1` or a custom
one as "unsigned integer". The number `0` is not valid and will **throw
an exception** as `TypeError`.

```javascript
// Valid:
var generator1 = aleaRNGFactory(); // Default seed: 1
var generator2 = aleaRNGFactory(4836325);

// Invalid:
var notValidGen1 = aleaRNGFactory(0);
var notValidGen2 = aleaRNGFactory(0.47);
var notValidGen3 = aleaRNGFactory(-1);
```

#### Create an unsigned integer

If you have an valid generator object you can use the `uInt32` method to
get a random unsigned integer. Call it multiple times to get new numbers.

```javascript
var generator = aleaRNGFactory(10);
generator.uInt32(); // 20916391
generator.uInt32(); // 1567221093
```

This should create the exact **same result on your machine**! You get always
the same values for the same seed used.

This means if you create multiple generators with the same seed, you get
the same result for the n-th call:

```javascript
var generator1 = aleaRNGFactory(2);
var generator2 = aleaRNGFactory(2);

var value1 = generator1.uInt32();
var value2 = generator2.uInt32();

value1 === value2; // true
```

#### Create an unsigned float

The same that works for [the uInt32 method](#create-an-unsigned-integer)
applies to the `uFloat32` method. But this time you get an unsigned float
value.

```javascript
var generator = aleaRNGFactory(5);
generator.uFloat32(); // 0.0024349885061383247
generator.uFloat32(); // 0.1826920467428863
```

Again, this should create the exact **same result on your machine**!

So, also if you create multiple generators with the same seed, you get
the same result for the n-th call:

```javascript
var generator1 = aleaRNGFactory(4);
var generator2 = aleaRNGFactory(4);

var value1 = generator1.uFloat32();
var value2 = generator2.uFloat32();

value1 === value2; // true
```

#### Change the seed

You can change the seed used by the generator object with the `setSeed`
method.

```javascript
var generator = aleaRNGFactory(1);

// Get some random numbers
generator.uInt32();
generator.uInt32();

// Change seed
generator.setSeed(2);

// Get some more random numbers
generator.uInt32();
generator.uInt32();
```

#### Get the state

You can get and restore the internal state with `getState` and `setState`.

```javascript
var generator = aleaRNGFactory();
generator.uInt32();
generator.uInt32();
var state = generator.getState(); // Get the generator state
var value1 = generator.uInt32();
generator.uInt32();
generator.uInt32();
generator.setState(state); // Set the previouse state
var value2 = generator.uInt32();

value1 === value2; // true
```

For the TypeScript the state interface is `NumberGeneratorState`.

```javascript
const generator = aleaRNGFactory();
generator.uInt32();

const state: NumberGeneratorState = generator.getState();
```

#### Set the state

You can set the state with `setState` on two ways, first, if you don't
pass any parameter the state resets to an initial state. Or you can pass
an state to restore a previous setting:

```javascript
var generator = aleaRNGFactory();
generator.uInt32();

var state = generator.getState();
generator.setState(); // Reset the state
generator.uInt32();   // Get a new value

generator.getState(state); // Restore saved state
```

#### Something like Math.random?

If you want something similar to `Math.random()` you can use the [JavaScript
Date API][date] with a timestamp, e.g.:

```javascript
var generator = aleaRNGFactory(Date.now());
var random = generator.uFloat32;

// Get a random float number
random();
```

### Generate hash

The `murmurHash` functions implements the [MurmurHash2 algorithm][mur]
in JavaScript. It takes an string and generates a non-cryptographic hash
number as unsigned integer.

The simplest way to use it is by passing a string to generate the hash
number. The default seed is `0`.

```javascript
var hash1 = murmurHash('My string.');
var hash2 = murmurHash('My string.', 0);

hash1;           // 1836966117
hash1 === hash2; // true
```

This should create the exact **same result on your machine**!

Different seeds generate different results for the same input string.
**Only whole numbers are valid seed** values for the `murmurHash` function!

```javascript
var hash1 = murmurHash('My string.', 1);
var hash2 = murmurHash('My string.', 2);

hash1 === hash2; // false
```

Float numbers as seed value throw a `TypeError`:

```javascript
var hash = murmurHash('My string.', 0.7); // TypeError!
```

### TypeScript

This package contains all the type definitions for TypeScript needed:

```typescript
import {
    NumberGenerator, NumberHashGenerator,
    aleaRNGFactory, murmurHash
} from 'number-generator';

const generator: NumberGenerator = aleaRNGFactory();
// const factory: () => NumberGenerator = aleaRNGFactory;

const hashFn: NumberHashGenerator = murmurHash;

generator.uInt32();
hashFn('What?', 42);
```

## Development

If you want ot contribute see [https://github.com/MartinHelmut/number-generator/blob/master/CONTRIBUTING.md][cont]

## Disclaimer

"Why one pseudo random number generator and one number hash function" you
may ask? Read more in [this fantastic blog post][unit] about "A primer
on repeatable random numbers" from Rune Skovbo Johansen.

Thanks to Johannes Baagøe for the Alea port and Ray Morgan for the MurmurHash2
algorithm implementation in JavaScript.

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
[date]: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date
[mur]: https://en.wikipedia.org/wiki/MurmurHash
[cont]: https://github.com/MartinHelmut/number-generator/blob/master/CONTRIBUTING.md
[unit]: https://blogs.unity3d.com/2015/01/07/a-primer-on-repeatable-random-numbers/

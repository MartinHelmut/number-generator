# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.0.5](https://github.com/MartinHelmut/number-generator/compare/v4.0.4...v4.0.5) (2020-12-26)

### [4.0.4](https://github.com/MartinHelmut/number-generator/compare/v4.0.2...v4.0.4) (2020-03-19)


### Bug Fixes

* use prepare script in package.json to check for package manager ([5d1fd5a](https://github.com/MartinHelmut/number-generator/commit/5d1fd5ad052faa79526c396333bc6028b9e7e7f0)), closes [#591](https://github.com/MartinHelmut/number-generator/issues/591)

### [4.0.3](https://github.com/MartinHelmut/number-generator/compare/v4.0.2...v4.0.3) (2020-03-19)


### Bug Fixes

* use prepare script in package.json to check for package manager ([5d1fd5a](https://github.com/MartinHelmut/number-generator/commit/5d1fd5ad052faa79526c396333bc6028b9e7e7f0)), closes [#591](https://github.com/MartinHelmut/number-generator/issues/591)

### [4.0.2](https://github.com/MartinHelmut/number-generator/compare/v4.0.1...v4.0.2) (2020-03-07)

### [4.0.1](https://github.com/MartinHelmut/number-generator/compare/v4.0.0...v4.0.1) (2019-09-26)


### Bug Fixes

* small typo in readme file ([3ab6068](https://github.com/MartinHelmut/number-generator/commit/3ab6068))

## [4.0.0](https://github.com/MartinHelmut/number-generator/compare/v3.0.1...v4.0.0) (2019-09-26)


### ⚠ BREAKING CHANGES

* This fix will change the resulting numbers generated with murmurhash2_x86_32 or
murmurhash3_x86_32 were non regular ASCII characters were used as hash before.

### Bug Fixes

* handle non regular ASCII characters for murmurhash implementation ([cb570f1](https://github.com/MartinHelmut/number-generator/commit/cb570f1))
* ignore compiled tests output for prettier and lint ([9b477ab](https://github.com/MartinHelmut/number-generator/commit/9b477ab))


### Features

* add new function murmurhash3_x64_128 to generate 128 bit hash strings for x64 ([efccc27](https://github.com/MartinHelmut/number-generator/commit/efccc27))
* add new function murmurhash3_x86_128 to generate 128 bit hash strings for x86 ([f799f89](https://github.com/MartinHelmut/number-generator/commit/f799f89))
* use C++ reference code to test implementations ([f501d9a](https://github.com/MartinHelmut/number-generator/commit/f501d9a)), closes [#8](https://github.com/MartinHelmut/number-generator/issues/8)

### [3.0.1](https://github.com/MartinHelmut/number-generator/compare/v3.0.0...v3.0.1) (2019-06-21)



## 3.0.0 (2019-06-21)


### Bug Fixes

* **state:** Don't use import helpers to resolve smaller compile results ([246a751](https://github.com/MartinHelmut/number-generator/commit/246a751))
* **test:** Run tests also on Windows ([24e6d3b](https://github.com/MartinHelmut/number-generator/commit/24e6d3b))
* **travis:** Simplyfied test command ([1f56366](https://github.com/MartinHelmut/number-generator/commit/1f56366))
* copy all typings to the distribution folder lib ([6fd3ead](https://github.com/MartinHelmut/number-generator/commit/6fd3ead))
* deactivate minify step ([51dd176](https://github.com/MartinHelmut/number-generator/commit/51dd176))
* ignore esloint compat option for build script ([7d98b8e](https://github.com/MartinHelmut/number-generator/commit/7d98b8e))
* murmurhash2_x86_32 do not return 0 for strings length multiply of 4 ([ceb8704](https://github.com/MartinHelmut/number-generator/commit/ceb8704)), closes [#78](https://github.com/MartinHelmut/number-generator/issues/78)
* remove bundle size based on security and pipeline issues ([480ac94](https://github.com/MartinHelmut/number-generator/commit/480ac94))
* show esm usage in readme ([7f51be3](https://github.com/MartinHelmut/number-generator/commit/7f51be3))


### Build System

* **lint:** Added eslint config to lint js config files (editor only) ([b95845a](https://github.com/MartinHelmut/number-generator/commit/b95845a))
* run tests against production bundles ([0d87b11](https://github.com/MartinHelmut/number-generator/commit/0d87b11))
* **release:** Committing generated artifacts in the release commit ([c2c658c](https://github.com/MartinHelmut/number-generator/commit/c2c658c))
* add browserlist option for maintained node versions ([48a24a7](https://github.com/MartinHelmut/number-generator/commit/48a24a7))
* Added prettier to format code ([1149b1d](https://github.com/MartinHelmut/number-generator/commit/1149b1d))
* clean up browser list environment and browser support ([72f3b87](https://github.com/MartinHelmut/number-generator/commit/72f3b87))
* drop support for node 6 and IE9 ([e17e5e6](https://github.com/MartinHelmut/number-generator/commit/e17e5e6))
* generate package-lock.json ([474c415](https://github.com/MartinHelmut/number-generator/commit/474c415))
* remove husky and lint-staged ([3888ea6](https://github.com/MartinHelmut/number-generator/commit/3888ea6))
* replace closure compiler js with terser ([a0ccab3](https://github.com/MartinHelmut/number-generator/commit/a0ccab3))
* replaced rollup-plugin-cpy with own version ([77e936b](https://github.com/MartinHelmut/number-generator/commit/77e936b))
* strip uglifyjs of api v2 cli flags ([e2a1ba1](https://github.com/MartinHelmut/number-generator/commit/e2a1ba1))
* use prettier as a pre-commit hook for js and md files ([203bdb8](https://github.com/MartinHelmut/number-generator/commit/203bdb8))
* **rollup:** show correct bundle and gzip size ([5a33988](https://github.com/MartinHelmut/number-generator/commit/5a33988))
* **rollup:** use clear plugin ([5be81fb](https://github.com/MartinHelmut/number-generator/commit/5be81fb))
* **rollup:** use cpy plugin to copy d.ts files to lib ([8cf052d](https://github.com/MartinHelmut/number-generator/commit/8cf052d))
* **tcs:** Use commonjs as target module type ([6c17cf0](https://github.com/MartinHelmut/number-generator/commit/6c17cf0))
* use rollup and closure to bundle single functions as well ([dc623f3](https://github.com/MartinHelmut/number-generator/commit/dc623f3))
* use rollup to build target bundle ([d165be7](https://github.com/MartinHelmut/number-generator/commit/d165be7))


### Features

* **state:** Added getter and setter for internal state ([94907f9](https://github.com/MartinHelmut/number-generator/commit/94907f9))
* add tree shaking check to production build step ([64c38c9](https://github.com/MartinHelmut/number-generator/commit/64c38c9))
* Change implementation from typescript to javascript ([809ed99](https://github.com/MartinHelmut/number-generator/commit/809ed99)), closes [#7](https://github.com/MartinHelmut/number-generator/issues/7)
* Initial beta release ([0fea451](https://github.com/MartinHelmut/number-generator/commit/0fea451))
* new function murmurhash3_x86_32 ([9506eab](https://github.com/MartinHelmut/number-generator/commit/9506eab))
* split methods to single functions ([e578e61](https://github.com/MartinHelmut/number-generator/commit/e578e61))
* throw a TypeError if hash is not a string for murmur functions ([0b07d34](https://github.com/MartinHelmut/number-generator/commit/0b07d34))
* use mocha and chai instead of jest ([c4a20b8](https://github.com/MartinHelmut/number-generator/commit/c4a20b8))


### refactor

* rename murmurHash function ([23951a8](https://github.com/MartinHelmut/number-generator/commit/23951a8))


### Tests

* **alea:** Added tests for incomplete state object ([6a137fd](https://github.com/MartinHelmut/number-generator/commit/6a137fd))
* add explicit test cases for reference implementations ([ab888de](https://github.com/MartinHelmut/number-generator/commit/ab888de))
* **karma:** Added test runner for browser tests ([52e7e45](https://github.com/MartinHelmut/number-generator/commit/52e7e45))
* add check for compatibility and function name export ([25a95f6](https://github.com/MartinHelmut/number-generator/commit/25a95f6))
* add explicit implementation test ([fa4450c](https://github.com/MartinHelmut/number-generator/commit/fa4450c))
* add TypeScript typings test ([e35138d](https://github.com/MartinHelmut/number-generator/commit/e35138d))
* add unit tests for helpful error message on murmur functions hash validation ([bb55991](https://github.com/MartinHelmut/number-generator/commit/bb55991))
* add utils tests ([4d360ec](https://github.com/MartinHelmut/number-generator/commit/4d360ec))
* Fixed karma browser test runner ([cf97d33](https://github.com/MartinHelmut/number-generator/commit/cf97d33))
* increase test loop iteration times 10 ([393ebc7](https://github.com/MartinHelmut/number-generator/commit/393ebc7))
* Renamed test cases ([0a36768](https://github.com/MartinHelmut/number-generator/commit/0a36768))
* Run build step before run tests ([b507592](https://github.com/MartinHelmut/number-generator/commit/b507592))
* scope production test run to functions that get packaged ([10c126a](https://github.com/MartinHelmut/number-generator/commit/10c126a))
* use dedicated istanbul configuration file ([4763827](https://github.com/MartinHelmut/number-generator/commit/4763827))
* Use jest as test runner ([2c055ad](https://github.com/MartinHelmut/number-generator/commit/2c055ad)), closes [#6](https://github.com/MartinHelmut/number-generator/issues/6)


### BREAKING CHANGES

* murmurHash function is now murmurhash2_x86_32
* This changes the language the library is implemented in.



<a name="2.3.1"></a>
## [2.3.1](https://github.com/MartinHelmut/number-generator/compare/v2.3.0...v2.3.1) (2019-01-19)



<a name="2.3.0"></a>
# [2.3.0](https://github.com/MartinHelmut/number-generator/compare/v2.2.5...v2.3.0) (2018-12-20)


### Bug Fixes

* copy all typings to the distribution folder lib ([1e9b41e](https://github.com/MartinHelmut/number-generator/commit/1e9b41e))


### Features

* throw a TypeError if hash is not a string for murmur functions ([d971adc](https://github.com/MartinHelmut/number-generator/commit/d971adc))
* use mocha and chai instead of jest ([6d4c037](https://github.com/MartinHelmut/number-generator/commit/6d4c037))



<a name="2.2.5"></a>
## [2.2.5](https://github.com/MartinHelmut/number-generator/compare/v2.2.4...v2.2.5) (2018-11-13)



<a name="2.2.4"></a>
## [2.2.4](https://github.com/MartinHelmut/number-generator/compare/v2.2.3...v2.2.4) (2018-10-18)



<a name="2.2.3"></a>
## [2.2.3](https://github.com/MartinHelmut/number-generator/compare/v2.2.2...v2.2.3) (2018-10-16)



<a name="2.2.2"></a>
## [2.2.2](https://github.com/MartinHelmut/number-generator/compare/v2.2.1...v2.2.2) (2018-10-03)



<a name="2.2.1"></a>
## [2.2.1](https://github.com/MartinHelmut/number-generator/compare/v2.2.0...v2.2.1) (2018-09-09)



<a name="2.2.0"></a>
# [2.2.0](https://github.com/MartinHelmut/number-generator/compare/v2.1.7...v2.2.0) (2018-08-21)


### Features

* add tree shaking check to production build step ([bc2aa11](https://github.com/MartinHelmut/number-generator/commit/bc2aa11))



<a name="2.1.7"></a>
## [2.1.7](https://github.com/MartinHelmut/number-generator/compare/v2.1.6...v2.1.7) (2018-08-05)



<a name="2.1.6"></a>
## [2.1.6](https://github.com/MartinHelmut/number-generator/compare/v2.1.5...v2.1.6) (2018-07-10)



<a name="2.1.5"></a>
## [2.1.5](https://github.com/MartinHelmut/number-generator/compare/v2.1.4...v2.1.5) (2018-05-31)


### Bug Fixes

* murmurhash2_x86_32 do not return 0 for strings length multiply of 4 ([90b067e](https://github.com/MartinHelmut/number-generator/commit/90b067e)), closes [#78](https://github.com/MartinHelmut/number-generator/issues/78)



<a name="2.1.4"></a>
## [2.1.4](https://github.com/MartinHelmut/number-generator/compare/v2.1.3...v2.1.4) (2018-05-29)



<a name="2.1.3"></a>
## [2.1.3](https://github.com/MartinHelmut/number-generator/compare/v2.1.2...v2.1.3) (2018-04-26)



<a name="2.1.2"></a>
## [2.1.2](https://github.com/MartinHelmut/number-generator/compare/v2.1.1...v2.1.2) (2018-03-24)



<a name="2.1.1"></a>
## [2.1.1](https://github.com/MartinHelmut/number-generator/compare/v2.1.0...v2.1.1) (2018-02-21)



<a name="2.1.0"></a>
# [2.1.0](https://github.com/MartinHelmut/number-generator/compare/v2.0.5...v2.1.0) (2018-02-16)


### Features

* new function murmurhash3_x86_32 ([dad69c7](https://github.com/MartinHelmut/number-generator/commit/dad69c7))



<a name="2.0.5"></a>
## [2.0.5](https://github.com/MartinHelmut/number-generator/compare/v2.0.4...v2.0.5) (2018-02-13)



<a name="2.0.4"></a>
## [2.0.4](https://github.com/MartinHelmut/number-generator/compare/v2.0.3...v2.0.4) (2018-02-13)



<a name="2.0.3"></a>
## [2.0.3](https://github.com/MartinHelmut/number-generator/compare/v2.0.2...v2.0.3) (2018-02-13)



<a name="2.0.2"></a>
## [2.0.2](https://github.com/MartinHelmut/number-generator/compare/v2.0.1...v2.0.2) (2018-02-12)


### Bug Fixes

* show esm usage in readme ([5603246](https://github.com/MartinHelmut/number-generator/commit/5603246))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/MartinHelmut/number-generator/compare/v2.0.0...v2.0.1) (2018-02-12)


### Bug Fixes

* deactivate minify step ([194177c](https://github.com/MartinHelmut/number-generator/commit/194177c))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/MartinHelmut/number-generator/compare/v1.0.4...v2.0.0) (2018-02-12)


### Code Refactoring

* rename murmurHash function ([5b93f47](https://github.com/MartinHelmut/number-generator/commit/5b93f47))


### Features

* split methods to single functions ([75bfdfb](https://github.com/MartinHelmut/number-generator/commit/75bfdfb))


### BREAKING CHANGES

* murmurHash function is now murmurhash2_x86_32



<a name="1.0.4"></a>
## [1.0.4](https://github.com/MartinHelmut/number-generator/compare/v1.0.3...v1.0.4) (2018-02-10)



<a name="1.0.3"></a>
## [1.0.3](https://github.com/MartinHelmut/number-generator/compare/v1.0.2...v1.0.3) (2018-02-08)



<a name="1.0.2"></a>
## [1.0.2](https://github.com/MartinHelmut/number-generator/compare/v1.0.1...v1.0.2) (2018-01-12)



<a name="1.0.1"></a>
## [1.0.1](https://github.com/MartinHelmut/number-generator/compare/v1.0.0...v1.0.1) (2017-11-15)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/MartinHelmut/number-generator/compare/v0.2.16...v1.0.0) (2017-11-15)


### Features

* Change implementation from typescript to javascript ([75167db](https://github.com/MartinHelmut/number-generator/commit/75167db)), closes [#7](https://github.com/MartinHelmut/number-generator/issues/7)


### BREAKING CHANGES

* This changes the language the library is implemented in.



<a name="0.2.16"></a>
## [0.2.16](https://github.com/MartinHelmut/number-generator/compare/v0.2.15...v0.2.16) (2017-11-03)



<a name="0.2.15"></a>
## [0.2.15](https://github.com/MartinHelmut/number-generator/compare/v0.2.14...v0.2.15) (2017-07-04)



<a name="0.2.14"></a>
## [0.2.14](https://github.com/MartinHelmut/number-generator/compare/v0.2.13...v0.2.14) (2017-07-04)



<a name="0.2.13"></a>
## [0.2.13](https://github.com/MartinHelmut/number-generator/compare/v0.2.12...v0.2.13) (2017-06-08)



<a name="0.2.12"></a>
## [0.2.12](https://github.com/MartinHelmut/number-generator/compare/v0.2.11...v0.2.12) (2017-04-26)



<a name="0.2.11"></a>
## [0.2.11](https://github.com/MartinHelmut/number-generator/compare/v0.2.10...v0.2.11) (2017-04-15)



<a name="0.2.10"></a>
## [0.2.10](https://github.com/MartinHelmut/number-generator/compare/v0.2.9...v0.2.10) (2017-04-04)



<a name="0.2.9"></a>
## [0.2.9](https://github.com/MartinHelmut/number-generator/compare/v0.2.8...v0.2.9) (2017-03-24)



<a name="0.2.8"></a>
## [0.2.8](https://github.com/MartinHelmut/number-generator/compare/v0.2.7...v0.2.8) (2017-03-07)



<a name="0.2.7"></a>
## [0.2.7](https://github.com/MartinHelmut/number-generator/compare/v0.2.6...v0.2.7) (2017-03-03)



<a name="0.2.6"></a>
## [0.2.6](https://github.com/MartinHelmut/number-generator/compare/v0.2.5...v0.2.6) (2017-02-24)



<a name="0.2.5"></a>
## [0.2.5](https://github.com/MartinHelmut/number-generator/compare/v0.2.4...v0.2.5) (2017-02-08)



<a name="0.2.4"></a>
## [0.2.4](https://github.com/MartinHelmut/number-generator/compare/v0.2.3...v0.2.4) (2017-01-24)


### Bug Fixes

* **travis:** Simplyfied test command ([2e4a053](https://github.com/MartinHelmut/number-generator/commit/2e4a053))



<a name="0.2.3"></a>
## [0.2.3](https://github.com/MartinHelmut/number-generator/compare/v0.2.2...v0.2.3) (2017-01-20)



<a name="0.2.2"></a>
## [0.2.2](https://github.com/MartinHelmut/number-generator/compare/v0.2.1...v0.2.2) (2017-01-19)


### Bug Fixes

* **test:** Run tests also on Windows ([e055a01](https://github.com/MartinHelmut/number-generator/commit/e055a01))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/MartinHelmut/number-generator/compare/v0.2.0...v0.2.1) (2017-01-17)


### Bug Fixes

* **state:** Don't use import helpers to resolve smaller compile results ([54cabba](https://github.com/MartinHelmut/number-generator/commit/54cabba))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/MartinHelmut/number-generator/compare/v0.1.9...v0.2.0) (2017-01-17)


### Features

* **state:** Added getter and setter for internal state ([5b836a3](https://github.com/MartinHelmut/number-generator/commit/5b836a3))



<a name="0.1.9"></a>
## [0.1.9](https://github.com/MartinHelmut/number-generator/compare/v0.1.8...v0.1.9) (2017-01-12)



<a name="0.1.8"></a>
## [0.1.8](https://github.com/MartinHelmut/number-generator/compare/v0.1.7...v0.1.8) (2017-01-12)



<a name="0.1.7"></a>
## [0.1.7](https://github.com/MartinHelmut/number-generator/compare/v0.1.6...v0.1.7) (2017-01-12)



<a name="0.1.6"></a>
## [0.1.6](https://github.com/MartinHelmut/number-generator/compare/v0.1.5...v0.1.6) (2017-01-12)



<a name="0.1.5"></a>
## [0.1.5](https://github.com/MartinHelmut/number-generator/compare/v0.1.4...v0.1.5) (2017-01-11)



<a name="0.1.4"></a>
## [0.1.4](https://github.com/MartinHelmut/number-generator/compare/v0.1.3...v0.1.4) (2017-01-11)



<a name="0.1.3"></a>
## [0.1.3](https://github.com/MartinHelmut/number-generator/compare/v0.1.2...v0.1.3) (2017-01-11)



<a name="0.1.2"></a>
## [0.1.2](https://github.com/MartinHelmut/number-generator/compare/v0.1.1...v0.1.2) (2017-01-11)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/MartinHelmut/number-generator/compare/v0.1.0...v0.1.1) (2017-01-11)



<a name="0.1.0"></a>
# 0.1.0 (2017-01-11)


### Features

* Initial beta release ([7c7500f](https://github.com/MartinHelmut/number-generator/commit/7c7500f))

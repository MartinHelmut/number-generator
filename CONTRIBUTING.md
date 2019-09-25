# Contributing

You want do something for this repo? Nice and easy! And of course: you
are the best!

## Contents

- [Run tests](#run-tests)
- [Format the code](#format-the-code)
- [Build the library](#build-the-library)
- [Build library documentation](#build-library-documentation)
- [Commit changes](#commit-changes)
- [Recommended workflow for release](#recommended-workflow-for-release)

---

Clone the repo and ...

## Environment

For this repository the package manager pnpm is used as a drop-in replacement for npm. Here you can find a guide on installing pnpm on your machine: [getting started with pnpm](pnurl).

## Generate reference data

To generate reference values in C++ please ensure that g++ is setup correctly (check by running `g++ --version` in your terminal).

The following command will generate reference values into a JSON file in `src/reference/cpp/results.json` that will be picked-up by the tests to match results against the C++ implementation.

```shell script
pnpm run build:reference:code
```

## Run tests

```shell script
# Run tests
pnpm test

# Run production tests
pnpm run test:prod

# Lint the application
pnpm run lint

# Test if the application is tree shakable
pnpm run test:treeshaking
```

Tests can also be executed in the browser. To generate the browser tests run:

```shell script
pnpm run build:tests
```

This will generate the necessary tests files compatible for the browser. After that you can open the `src/__tests__/browser.html` in your browser to view the tests.

## Format the code

To format the code use `pnpm run format`. This is command runs automatically before commit.

## Build the library

If you want to build the application run

```shell script
pnpm run build
```

for a minified version.

## Build library documentation

To create an API documentation run:

```shell script
pnpm run build:docs
```

You can also serve the documentation locally or via network with:

```shell script
pnpm run start:docs
```

## Commit changes

**This repo is is Commitizen-friendly!** ([read more][czcli])

Checkout a new branch, there is no naming convention for branches, only for commits. Add your changes and run `npm run commit` to start the commitizen cli to create a proper commit message.

Push the changes and your feature branch and create a "Merge Request" on GitHub.

## Recommended workflow for release

1.  Make changes
2.  Commit those changes with `pnpx git-cz` (or `pnpm run commit`)
3.  Make sure all tests turn green
4.  Create a new release with `pnpm run release`
5.  Push your release `git push --follow-tags origin master`
6.  Publish: `NPM_CONFIG_OTP=XXXXXX npm publish` (replace `XXXXXX` with a valid 2FA token)
7.  **Done!**

For more information on building a release see [https://github.com/conventional-changelog/standard-version][sv]

[czcli]: http://commitizen.github.io/cz-cli/
[sv]: https://github.com/conventional-changelog/standard-version
[karma]: https://karma-runner.github.io/1.0/index.html
[pnurl]: https://pnpm.js.org/docs/en/installation.html

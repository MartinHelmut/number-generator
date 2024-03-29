# Contributing

You want to contribute to this repo? Nice! **You are the best!** Here is a guide on how to work with it and what to expect.

## Contents

- [Run tests](#run-tests)
- [Format and lint the code](#format-and-lint-the-code)
- [Build the library](#build-the-library)
- [Build library documentation](#build-library-documentation)
- [Commit changes](#commit-changes)
- [Recommended workflow for release](#recommended-workflow-for-release)

---

First things first, clone the repo and ...

## Environment

For this repository the package manager pnpm is used as a drop-in replacement for npm. Here you can find a guide on installing pnpm on your machine: [getting started with pnpm](pnurl).

## Generate reference data

To generate reference values in C++ please ensure that g++ is setup correctly (check by running `g++ --version` in your terminal).

The following command will generate reference values into a JSON file in `src/reference/cpp/results.json` that will be picked-up by the tests to match results against the C++ implementation. This will ensure that the JavaScript implementation produces the same values as the C++ one.

```shell script
pnpm build:reference:code
```

## Run tests

```shell script
# Run tests
pnpm test

# Run production tests
pnpm test:prod

# Test if the application is tree shakable
pnpm test:treeshaking
```

Tests can also be executed in a browser of your choice. To generate the browser tests run:

```shell script
pnpm build:tests
```

This will generate the necessary tests files compatible for the browser in `compiled_tests/`. After that you can open the `src/__tests__/browser.html` in a browser to view the tests.

## Format and lint the code

```shell script
# Lint the application
pnpm lint

# Check the formatting, enforced by prettier
pnpm format:check

# Format the code with prettier
pnpm format
```

## Build the library

To build the project run:

```shell script
pnpm build
```

to generate a minified version of the library under `lib/`.

## View local library documentation

You can serve the documentation locally or via your local network by running:

```shell script
pnpm docs:local
```

This will use [JSDoc][jsdoc] to generate the documentation.

## Commit changes

**This repo is Commitizen-friendly!** (read more in the [official commitizen documentation][czcli])

Checkout a new branch, there is no naming convention for branches, only for commits. Add your changes and run `pnpx git-cz` (or `pnpm commit`) to start the commitizen cli to create a proper commit message.

Push the changes with your feature branch and create a "Pull Request" on GitHub.

## Recommended workflow for release

1.  Make changes
2.  Commit those changes with `pnpx git-cz` (or `pnpm commit`)
3.  Create a new release with `pnpm release`
4.  Push your release `git push --follow-tags origin main`
5.  Publish: `NPM_CONFIG_OTP=XXXXXX npm publish` (replace `XXXXXX` with a valid 2FA token)
6.  **Done!**

For more information on building a release see [https://github.com/absolute-version/commit-and-tag-version][sv]

[czcli]: http://commitizen.github.io/cz-cli/
[sv]: https://github.com/absolute-version/commit-and-tag-version
[karma]: https://karma-runner.github.io/1.0/index.html
[pnurl]: https://pnpm.js.org/docs/en/installation.html
[jsdoc]: https://jsdoc.app/

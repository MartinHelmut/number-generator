# Contributing

You want do something for this repo? Nice and easy! And of course: you
are the best!

Clone the repo and ...

## Run tests

To lint the application and run all the tests use:

```shell
npm test
```

## Build the library

If you want to build the application you can either run

```shell
npm run build
```

for a default build or

```shell
npm run build:production
```

for a minified version.

## Commit changes

**This repo is is Commitizen-friendly!** ([read more][czcli])

Checkout a new branch, the naming convention is:

`[feature|fix|refactor|chore]/change-name`

e.g.:

```shell
git checkout -b feature/restore-alea-state
```

Add your changes and run `npm run commit` to start the commitizen cli
to create a proper commit message.

Push the changes and your feature branch and create a "Merge Request" on
GitHub.

[czcli]: http://commitizen.github.io/cz-cli/

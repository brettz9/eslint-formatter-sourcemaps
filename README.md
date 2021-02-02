# eslint-formatter-sourcemaps [![Build Status](https://travis-ci.org/brettz9/eslint-formatter-sourcemaps.svg?branch=master)](https://travis-ci.org/brettz9/eslint-formatter-sourcemaps)

ESLint formatter that understands inline source-maps and works properly
therewith.

Fork of [`eslint-path-formatter2`](https://github.com/a-x-/eslint-path-formatter2)
but with a few fixes and ability to use without a relative path.

## Usage

```sh
eslint -f sourcemaps .
```

## To-dos

1. Switch from jshint to ESLint
1. Get rid of Grunt and update devDeps
1. Add `nyc` for coverage testing

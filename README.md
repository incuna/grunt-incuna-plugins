# Grunt incuna plugins

A set of useful build and testing plugins easily reusable across projects.

* [Development](#development)
 * [Adding new plugins](#adding-new-plugins)
* [Plugins](#plugins)
 * [update-po-files](#update-po-files)

## Plugins

### `update-po-files`

A plugin for automatically updating specified `.po` files with a specifed `*.pot` file.
Usage example:
```js
'update-po-files': {
    options: {
        template: 'my-u18n-directory/template.pot'
    },
    all: {
        src: 'my-i18n-directory/**/*.po'
    }
},
```

Requires binary `msgmerge` to run, will complain if one isn't found. Because OS X comes with it's own version of `gettext`, but without the binary tools it is required to install and force link it via `brew`:
```
brew install gettext
brew link gettext --force
```

## Development

Install dependencies with `npm install`. To test run `grunt test`.

### Adding new plugins

Each plugin should consist of two files:

* `example-plugin.js` in directory `plugins` which registers the task under the same name (eg. `example-plugin`)
* `test-example-plugin.js` in directory `tests` which registers two tasks:
 * `set-up-example-plugin` - A pre-test setup task 
 * `test-example-plugin` - A test task 

All tests will be run automatically if using this structure

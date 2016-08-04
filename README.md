# Grunt incuna plugins

A set of useful build and testing plugins easily reusable across projects.

* [Development](#development)
 * [Adding new plugins](#adding-new-plugins)
 * [Adding helper functions](#adding-helper-functions)
* [Plugins](#plugins)
 * [update-po-files](#update-po-files)
 * [ng-templates-paths](#ng-templates-paths)

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

### `ng-templates-paths`

A helper function to generate a config for `grunt-angular-templates`.

Usage example:
```js
const ngTemplatesPaths = require('grunt-incuna-plugins/ng-templates-paths')();

grunt.initConfig({
    ...
    ngtemplates: ngTemplatesPaths.generate('my-library'),
    ...
});
```

Arguments:
* `string` `libraryName` - required
* `string` `cwd` - defaults to `src`
* `string` `dest` - defaults to `src/scripts`


## Development

Install dependencies with `npm install`. To test run `grunt test`.

### Adding new plugins

Each plugin should consist of two files:

* `example-plugin.js` in directory `plugins` which registers the task under the same name (eg. `example-plugin`)
* `test-example-plugin.js` in directory `tests` which registers two tasks:
 * `set-up-example-plugin` - A pre-test setup task 
 * `test-example-plugin` - A test task 

All tests will be run automatically if using this structure

### Adding helper functions

Helper functions are located in `helper-functions/`. For those a `test-` file is needed which only registers a `test-` task.

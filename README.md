# Grunt incuna plugins

A set of useful build and testing plugins easily reusable across projects.

[Adding new plugins](#adding-new-plugins)
[Plugins](#plugins)
* [update-po-files](#update-po-files)

## Plugins

### `update-po-files`

A plugin for automatically updating `.po` files in a given directory from a `template.pot` file in that same directory.
Usage:
```js
'update-po-files': {
    all: {
        src: 'my-i18n-directory'
    }
},
```

Requires binary `msgmerge` to run, will complain if one isn't found. Because OS X comes with it's own version of `gettext`, but without the binary tools it is required to install and force link it via `brew`:
```
brew install gettext
brew link gettext --force
```

## Adding new plugins

Each plugin should have a directory under `grunt/` with it's name (eg. `example-plugin`) and two files:
* `task.js` which registers a grunt task under the same name as the directory (ie. `example-plugin`)
* `test.js` which registers two tasks:
 * `set-up-example-plugin` - A pre-test setup task 
 * `test-example-plugin` - A test task 

All tests will be run automatically if using this structure

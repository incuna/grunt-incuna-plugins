# Grunt incuna plugins

A set of useful build and testing plugins easily reusable across projects.

* [Plugins](#plugins)

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

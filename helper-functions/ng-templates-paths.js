module.exports = function () {

    'use strict';

    const fs = require('fs');
    const _ = require('lodash');

    const generate = function (libraryName, cwd = 'src', dest = 'src/scripts') {

        const modules = fs.readdirSync(`${cwd}/templates/${libraryName}`);

        let ngtemplatesConfig = {};

        _.each(modules, function (module) {
            ngtemplatesConfig[module] = {
                cwd: cwd,
                src: `templates/${libraryName}/${module}/**/*.html`,
                dest: `${dest}/${module}/templates.js`,
                options: {
                    module: `${libraryName}-${module}`
                }
            };
        });

        ngtemplatesConfig = _.extend({
            options: {
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true
                }
            }
        }, ngtemplatesConfig);

        return ngtemplatesConfig;
    };

    return {
        generate
    };
};

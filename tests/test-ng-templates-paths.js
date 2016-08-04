module.exports = function (grunt) {

    'use strict';

    const assert = require('assert');

    grunt.registerTask('set-up-ng-templates-paths', 'Blank', () => {});

    grunt.registerTask('test-ng-templates-paths', () => {
        const ngTemplatesPaths = require('../helper-functions/ng-templates-paths')();
        const output = ngTemplatesPaths.generate('test-library', 'test-files/ng-templates-paths/src');

        const expectedModule1Path = 'templates/test-library/module-1/**/*.html';
        const expectedModule2Path = 'templates/test-library/module-2/**/*.html';
        const expectedModule1Options = 'test-library-module-1.templates';

        assert(output['module-1'], 'Module-1 is not defined in output');
        assert(output['module-2'], 'Module-2 is not defined in output');
        assert(output['module-1'].src === expectedModule1Path, 'Module-1 paths mismatch');
        assert(output['module-2'].src === expectedModule2Path, 'Module-2 paths mismatch');
        assert(output['module-1'].options.module === expectedModule1Options, 'Module-1 options mismatch');

        grunt.log.ok();
    });

};

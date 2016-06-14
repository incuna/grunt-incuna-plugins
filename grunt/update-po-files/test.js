module.exports = function (grunt) {

    'use strict';

    const execSync = require('child_process').execSync;
    const copySync = require('fs-extra').copySync;
    const assert = require('assert');
    const sourceFiles = grunt.config('config.directories.sourceFiles');
    const i18nDir = grunt.config('config.directories.i18n');

    const setupTask = function () {
        copySync(`${sourceFiles}/original.po`, `${i18nDir}/updated.po`);
    };
    grunt.registerTask(
        'set-up-update-po-files',
        'Prepare source files for testing',
        setupTask
    );

    grunt.registerTask('test-update-po-files', () => {
        const diff = `diff ${i18nDir}/updated.po ${sourceFiles}/expected.po | wc -l`;
        let diffResult = execSync(diff, {
            encoding: 'utf8'
        });

        diffResult = parseInt(diffResult, 10);
        assert(diffResult === 0,
            `updated.po file doesn't match expected.po file`
        );
    });
};

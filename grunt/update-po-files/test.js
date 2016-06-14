module.exports = function (grunt) {

    const execSync = require('child_process').execSync;
    const copySync = require('fs-extra').copySync;
    const assert = require('assert');
    const sourceFiles = grunt.config('config.directories.sourceFiles');
    const i18nDir = grunt.config('config.directories.i18n');

    grunt.registerTask('set-up-update-po-files', 'Prepare source files for testing', () => {
        copySync(`${sourceFiles}/original.po`, `${i18nDir}/updated.po`);
    });

    grunt.registerTask('test-update-po-files', () => {
        let diffResult = execSync(`diff ${i18nDir}/updated.po ${sourceFiles}/expected.po | wc -l`, {encoding: 'utf8'});
        diffResult = parseInt(diffResult, 10);
        assert(diffResult === 0, `updated.po file doesn't match expected.po file`);
    });
};

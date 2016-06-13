module.exports = function (grunt) {
    'use strict';

    const execSync = require('child_process').execSync;

    grunt.registerMultiTask('update-po-files', 'Update po files from template.pot using msgmerge', function () {
        const msgmergeLookup = 'which msgmerge;echo $?';
        const msgmergePresent = !parseInt(execSync(msgmergeLookup, 'utf8'), 10);

        if (!msgmergePresent) {
            grunt.fatal(`msgmerge is not available on the system. Please make sure gettext is installed. You may have to do 'brew link gettext --force' if on OS X.`);
        }

        const poFilesDir = this.filesSrc[0];

        const pathIsDirectory = grunt.file.isDir(poFilesDir);
        const notOneDirectory = this.filesSrc.length !== 1;

        if (!pathIsDirectory || notOneDirectory) {
            grunt.fatal('update-po-files requires one directory provided as the src path');
        }

        // Look for all *.po files in poFilesDir and try msgmerge on them to automatically update any new translations
        const translationCommand = `find ${poFilesDir} -name \*.po -exec sh -c \
            'if msgmerge -U --silent --backup=none --no-fuzzy-matching "{}" ${poFilesDir}/template.pot; then \
                echo Updated {}; \
            fi' \\;`;

        const msgmergeOutput = execSync(translationCommand, 'utf8');

        grunt.log.oklns(msgmergeOutput);
    });
};

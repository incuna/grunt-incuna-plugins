module.exports = function (grunt) {
    'use strict';

    const execSync = require('child_process').execSync;

    grunt.registerTask('update-po-files', 'Update po files from template.pot using msgmerge', function () {
        console.log(this.files);
        const msgmergeLookup = 'which msgmerge;echo $?';
        const msgmergePresent = !parseInt(execSync(msgmergeLookup, 'utf8', 10));

        if (!msgmergePresent) {
            grunt.fatal(`msgmerge is not available on the system. Please make sure gettext is installed. You may have to do 'brew link gettext --force' if on OS X.`);
        }

        const poFilesDir = this.options().poFilesDir;

        // Look for all *.po files in poFilesDir and try msgmerge on them to automatically update any new translations
        const translationCommand = `find ${poFilesDir} -name \*.po -exec sh -c \
            'if msgmerge -U --silent --backup=none --no-fuzzy-matching "{}" ${poFilesDir}/example-template.pot; then \
                echo Updated {}; \
            fi' \\;`;

        const msgmergeOutput = execSync(translationCommand, 'utf8');

        grunt.log.oklns(msgmergeOutput);
    });
};

module.exports = function (grunt) {

    'use strict';

    const execSync = require('child_process').execSync;

    const task = function () {
        const msgmergeLookup = 'which msgmerge;echo $?';
        const msgmergePresent = !parseInt(execSync(msgmergeLookup, 'utf8'), 10);

        if (!msgmergePresent) {
            grunt.fatal(
                'msgmerge is not available on the system. Please make sure gettext is' +
                ' installed. You may have to do \'brew link gettext --force\' if on OS X.'
            );
        }

        this.options({
            template: 'template.pot'
        });

        const templateFile = this.options().template;

        const poFiles = this.filesSrc.join(' ');

        grunt.log.oklns(`Attempting to update ${this.filesSrc.length} file(s)`);

        // Update all specifed *.po files and attempt to automatically update any new translations
        const msgmergeOptions = '-U --silent --backup=none --no-fuzzy-matching';
        const translationCommand =
            `for i in \`ls ${poFiles}\`; do
                if msgmerge ${msgmergeOptions} "$i" ${templateFile}; then
                    echo Updated $i
                fi
            done`;

        const msgmergeOutput = execSync(translationCommand, 'utf8');

        grunt.log.oklns(msgmergeOutput);
    };

    grunt.registerMultiTask(
        'update-po-files',
        'Update *.po files from a template or other *.po files using msgmerge',
        task
    );

};

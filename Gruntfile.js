module.exports = function (grunt) {

    'use strict';

    if (grunt.option('help')) {
        // Load all tasks so they can be viewed in the help: grunt -h or --help.
        require('load-grunt-tasks')(grunt);
    } else {
        // Use jit-grunt to only load necessary tasks for each invocation of grunt.
        require('jit-grunt')(grunt, {
            // Parse mappings for tasks whose taskname differs from its config key.
            'update-po-files': './grunt/update-po-files.js',
            'clean': 'grunt-contrib-clean'
        });
    }

    grunt.initConfig({
        'update-po-files': {
            options: {
                poFilesDir: 'test-files/i18n'
            },
            files: ['src', 'dest']
        },
        clean: {
            all: ['test-files/i18n/*.po']
        }
    });

    grunt.registerTask('default', 'dev');

    grunt.registerTask('dev', () => {
        grunt.task.run([
            'update-po-files'
        ]);
    });

    grunt.registerTask('test', () => {
        grunt.task.run([
            'clean',
            'copy-source-files',
            'test-plugins',
            'clean'
        ]);
    });

    const fs = require('fs-extra');
    const copySync = fs.copySync;
    const assert = require('assert');
    const execSync = require('child_process').execSync;

    grunt.registerTask('test-plugins', () => {
        const plugins = [
            'update-po-files'
        ];

        let tasksList = [];

        plugins.forEach((plugin) => {
            tasksList.push(plugin);
            tasksList.push(`test-${plugin}`);
        });

        grunt.task.run(tasksList);
    });

    grunt.registerTask('copy-source-files', 'Prepare source files for testing', () => {
        copySync('test-files/source-files/original.po', 'test-files/i18n/updated.po');
    });

    grunt.registerTask('test-update-po-files', () => {
        var diffResult = execSync('diff test-files/i18n/updated.po test-files/source-files/expected.po | wc -l', {encoding: 'utf8'});
        var diffResult = parseInt(diffResult, 10);
        assert(diffResult === 0, `updated.po file doesn't match expected.po file`);
    });

};

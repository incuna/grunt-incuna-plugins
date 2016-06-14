module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        config: {
            files: {
                po: '<%= config.directories.i18n %>/*.po'
            },
            directories: {
                testResource: 'test-files',
                i18n: '<%= config.directories.testResource %>/i18n',
                sourceFiles: '<%= config.directories.testResource %>/source-files',
                plugins: 'plugins'
            }
        },
        'update-po-files': {
            options: {
                template: '<%= config.directories.i18n %>/template.pot'
            },
            all: {
                src: '<%= config.directories.i18n %>/**/*.po'
            }
        },
        clean: {
            all: ['<%= config.files.po %>']
        },
        jshint: {
            all: {
                options: {
                    jshintrc: '.jshintrc'
                },
                files: {
                    src: ['<%= config.directories.plugins %>', 'Gruntfile.js']
                }
            }
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            src: ['<%= config.directories.plugins %>', 'Gruntfile.js']
        }
    });

    const fs = require('fs-extra');

    if (grunt.option('help')) {
        // Load all tasks so they can be viewed in the help: grunt -h or --help.
        require('load-grunt-tasks')(grunt);
    } else {
        // Use jit-grunt to only load necessary tasks
        //  for each invocation of grunt.
        require('jit-grunt')(grunt);
    }

    // Load all plugins and test files
    grunt.loadTasks('./plugins');
    grunt.loadTasks('./tests');

    grunt.registerTask('default', 'test');

    grunt.registerTask('test', () => {
        grunt.task.run([
            'clean',
            'jshint',
            'jscs',
            'test-plugins',
            'clean'
        ]);
    });

    grunt.registerTask('test-plugins', () => {
        const pluginsDir = grunt.config('config.directories.plugins');
        const pluginList = fs.readdirSync(pluginsDir, 'utf8');

        let tasksList = [];

        pluginList.forEach((pluginFile) => {
            let plugin = pluginFile.slice(0, -3);
            tasksList.push(`set-up-${plugin}`);
            tasksList.push(plugin);
            tasksList.push(`test-${plugin}`);
        });

        grunt.task.run(tasksList);
    });

};

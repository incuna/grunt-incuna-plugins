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
                plugins: 'grunt'
            }
        },
        'update-po-files': {
            all: {
                src: '<%= config.directories.i18n %>'
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
    const pluginsDir = grunt.config('config.directories.plugins');
    const pluginList = fs.readdirSync(pluginsDir, 'utf8');

    if (grunt.option('help')) {
        // Load all tasks so they can be viewed in the help: grunt -h or --help.
        require('load-grunt-tasks')(grunt);
    } else {
        // Use jit-grunt to only load necessary tasks
        //  for each invocation of grunt.
        var taskJITObject = {
            // Parse mappings for tasks whose taskname differs
            //  from its config key.
            clean: 'grunt-contrib-clean'
        };

        // Create tasks for each plugin
        pluginList.forEach((plugin) => {
            taskJITObject[plugin] = `./grunt/${plugin}/task.js`;
            taskJITObject[`set-up-${plugin}`] = `./grunt/${plugin}/test.js`;
            taskJITObject[`test-${plugin}`] = `./grunt/${plugin}/test.js`;
        });

        require('jit-grunt')(grunt, taskJITObject);
    }

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
        let tasksList = [];

        pluginList.forEach((plugin) => {
            tasksList.push(`set-up-${plugin}`);
            tasksList.push(plugin);
            tasksList.push(`test-${plugin}`);
        });

        grunt.task.run(tasksList);
    });

};

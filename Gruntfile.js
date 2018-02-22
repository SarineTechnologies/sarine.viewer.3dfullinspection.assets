'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    grunt.initConfig({
        config: grunt.file.readJSON("package.json"),
        copy: {
            build: {
                flatten: false,
                cwd: "src",
                src: ["**/*"],
                dest: "dist",
                expand: true
                
            }
        },
        concat: {
            comment: {
                options: {
                    stripBanners: true,
                    banner: '/*\n<%= config.name %> - v<%= config.version %> - ' +
                        ' <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> ' + '\n*/\n',
                },
                src: ["dist/mglass.js"],
                dest: 'dist/mglass.js'
            },
             commentCss: {
                options: {
                    stripBanners: true,
                    banner: '/*\n<%= config.name %> - v<%= config.version %> - ' +
                        ' <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> ' + '\n*/\n',
                },
                src: ["dist/inspection.css"],
                dest: 'dist/inspection.css'
            }
        },
        watch: {
                options: {
                    interrupt: true
                },
                scripts: {
                    files: ['coffee/<%= config.name %>.coffee'],
                    tasks: ['build'],
                    options: {
                        spawn: false,
                    }
                }
            }
    });
    grunt.registerTask('build', ['copy', 'concat:comment', 'concat:commentCss']);

    grunt.registerTask('dev', ['build', 'watch']);

};

'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    var files = ["Gruntfile.js","GruntfileBundle.js", "package.json", "dist/*.*", "src/*.*", "bower.json", "release.cmd", "bundle.cmd", "commit.cmd", "assets/*.*"]
    var message = "commit"
    grunt.initConfig({
        config: grunt.file.readJSON("bower.json"),
        version: {
            project: {
                src: ['bower.json', 'package.json']
            }
        },
        copy: {
            build: {
                flatten: true,
                src: ["src/*.*"],
                dest: "dist",
                expand: true
            }
        },
        gitcommit: {
            all: {
                options: {
                    message: "<%= config.message %>",
                    force: true
                },
                files: {
                    src: files
                }
            },
            bower: {
                options: {
                    message: "release : <%= config.version %>",
                    force: true
                },
                files: {
                    src: ["bower.json", "package.json"]
                }
            }
        },
        gitpush: {
            all: {
                options: {
                    force: true
                },
                files: {
                    src: files
                }
            }
        },
        gitadd: {
            firstTimer: {
                option: {
                    force: true
                },
                files: {
                    src: files
                }
            }
        },
        gitpull: {
            build: {
                options: {
                    force: true
                },
                files: {
                    src: files
                }
            }
        },
        prompt: {
            all: {
                options: {
                    questions: [{
                        config: 'config.message',
                        type: 'input',
                        message: 'comment:\n',
                        default: 'commit'
                    }]
                }
            }
        }
    })
    grunt.registerTask('build', ['copy']);
    grunt.registerTask('commit', ['prompt', 'gitadd', 'gitcommit:all', 'gitpush']);
    grunt.registerTask('release-git', ['version:project:patch', 'gitcommit:bower', 'release']);
};
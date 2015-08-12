'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    grunt.initConfig({      
        
        copy: {
            build: {
                flatten: true,
                src: ["src/*.*"],
                dest: "dist",
                expand: true
            }
        }
    })
    grunt.registerTask('bundle', ['copy']);

};

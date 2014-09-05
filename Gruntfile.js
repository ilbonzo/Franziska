'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app: 'app',
        dist: 'dist',

        sass: {
            options: {
                includePaths: ['<%= app %>/bower_components/foundation/scss']
            },
            dist: {
                options: {
                    outputStyle: 'extended'
                },
                files: {
                    '<%= app %>/css/app.css': '<%= app %>/scss/app.scss'
                }
            }
        },



        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= app %>/js/**/*.js'
            ]
        },

        clean: {
            dist: {
                src: ['<%= dist %>/*']
            },
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd:'<%= app %>/',
                    src: ['fonts/**', '**/*.html', '!**/*.scss', '!bower_components/**'],
                    dest: '<%= dist %>/'
                } , {
                    expand: true,
                    flatten: true,
                    src: ['<%= app %>/bower_components/font-awesome/fonts/**'],
                    dest: '<%= dist %>/fonts/',
                    filter: 'isFile'
                } ]
            },
        },

        imagemin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= app %>/images/',
                    src: ['**/*.{jpg,gif,svg,jpeg,png}'],
                    dest: '<%= dist %>/images/'
                }]
            }
        },

        uglify: {
            options: {
                preserveComments: 'some',
                mangle: false
            }
        },

        useminPrepare: {
            html: ['<%= app %>/index.html'],
            options: {
                dest: '<%= dist %>'
            }
        },

        usemin: {
            html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
            css: ['<%= dist %>/css/**/*.css'],
            options: {
                dirs: ['<%= dist %>']
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['sass']
            },
            sass: {
                files: '<%= app %>/scss/**/*.scss',
                tasks: ['sass']
            },
            livereload: {
                files: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
                options: {
                    livereload: true
                }
            }
        },

        connect: {
            app: {
                options: {
                    port: 9002,
                    base: '<%= app %>/',
                    open: true,
                    livereload: true,
                    hostname: '127.0.0.1'
                }
            },
            dist: {
                options: {
                    port: 9003,
                    base: '<%= dist %>/',
                    open: true,
                    keepalive: true,
                    livereload: false,
                    hostname: '127.0.0.1'
                }
            }
        },

        wiredep: {
            target: {
                src: [
                    '<%= app %>/**/*.html'
                ],
                exclude: [
                    'modernizr',
                    'font-awesome',
                    'jquery-placeholder',
                    'jquery.cookie',
                    'foundation'
                ]
            }
        },

        'gh-pages': {
            public: {
                options: {
                    base: 'dist',
                    message: 'Publish on gh-pages'
                },
                src: ['**']
            }
        },

        jasmine: {
            components: {
                src: [
                    'app/js/*js'
                ],
                options: {
                    specs: 'tests/spec/*Spec.js',
                    keepRunner : true,
                    //helpers: 'test/spec/*.js'
                    vendor: [
                        "app/bower_components/jquery/dist/jquery.js",
                        "app/bower_components/fastclick/lib/fastclick.js",
                        "app/bower_components/jquery.scrollTo/jquery.scrollTo.js",
                        "app/bower_components/jquery.scrollTo/jquery.scrollTo.min.js",
                        "app/bower_components/jquery.serialScroll/jquery.serialScroll.js",
                        "app/bower_components/jquery.serialScroll/jquery.serialScroll.min.js",
                        "app/bower_components/jQuery-Parallax/scripts/jquery.parallax-1.1.3.js",
                        "app/bower_components/jquery.localScroll/jquery.localScroll.js",
                        "app/bower_components/jquery.localScroll/jquery.localScroll.min.js",
                        "app/bower_components/jquery.inview/jquery.inview.js",
                        "app/bower_components/jquery.easing/js/jquery.easing.min.js",
                        "app/bower_components/foundation/js/foundation/foundation.js",
                        "app/bower_components/foundation/js/foundation/foundation.abide.js",
                        "app/bower_components/foundation/js/foundation/foundation.accordion.js",
                        "app/bower_components/foundation/js/foundation/foundation.alert.js",
                        "app/bower_components/foundation/js/foundation/foundation.clearing.js",
                        "app/bower_components/foundation/js/foundation/foundation.dropdown.js",
                        "app/bower_components/foundation/js/foundation/foundation.equalizer.js",
                        "app/bower_components/foundation/js/foundation/foundation.interchange.js",
                        "app/bower_components/foundation/js/foundation/foundation.joyride.js",
                        "app/bower_components/foundation/js/foundation/foundation.magellan.js",
                        "app/bower_components/foundation/js/foundation/foundation.offcanvas.js",
                        "app/bower_components/foundation/js/foundation/foundation.orbit.js",
                        "app/bower_components/foundation/js/foundation/foundation.reveal.js",
                        "app/bower_components/foundation/js/foundation/foundation.slider.js",
                        "app/bower_components/foundation/js/foundation/foundation.tab.js",
                        "app/bower_components/foundation/js/foundation/foundation.tooltip.js",
                        "app/bower_components/foundation/js/foundation/foundation.topbar.js",
                    ]
                }
            }
        }

    });


    grunt.registerTask('compile-sass', ['sass']);
    grunt.registerTask('bower-install', ['wiredep']);

    grunt.registerTask('default', ['compile-sass', 'bower-install', 'connect:app', 'watch']);
    grunt.registerTask('validate-js', ['jshint']);
    grunt.registerTask('server-dist', ['connect:dist']);

    grunt.registerTask('publish', ['compile-sass', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);

    grunt.registerTask('deploy', ['publish', 'gh-pages:public']);

    grunt.registerTask('travis', ['jasmine']);

};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // read Package.json
    pkg: grunt.file.readJSON('package.json'),

    // -----------------------------
    // Browserify
    // -----------------------------

    browserify: {
      core: {
        options: {
          transform:[["babelify", { "presets": ["es2015"] }]],
        },
        src: 'src/index.js',
        dest: 'build/main.build.js',
      },
    },

    // -----------------------------
    // Uglify
    // -----------------------------

    uglify: {
      core: {
        files: {
          './build/travisTester.min.js': ['./build/travisTester.js'],
        }
      }
    },

    // -----------------------------
    // Watch
    // -----------------------------

    watch: {
      scripts: {
        files: ['src/index.js', 'Gruntfile.js', './src/**/*.js'],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      },
    },

    // -----------------------------
    // JSHint
    // -----------------------------

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: ['./src/**/*.js'],
      },
    },

    // -----------------------------
    // Connect - Static Server
    // -----------------------------

    connect: {
      server: {
        options: {
          port: 5555
        }
      }
    },

  });

  // Load the Plugins
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Task(s)
  grunt.registerTask('build', ['jshint', 'browserify'/*, 'uglify'*/]);
  grunt.registerTask('serve', ['connect', 'build', 'watch']);

};

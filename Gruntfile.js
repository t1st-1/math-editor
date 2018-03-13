module.exports = function(grunt) {

  grunt.initConfig({

  watch: {
    js: {
      files: ['src/**/*.js'],
      tasks: ['concat:app', 'babel', 'browserify', 'concat:lib', 'concat:dist'],
      options: {
        spawn: false,
      },
    },

    css: {
      files: ['src/**/*.scss'],
      tasks: ['sass', 'concat:css'],
      options: {
        spawn: false,
      },
    }
  },

  sass: {
    dist: {
      options: {
       style: 'expanded',
       sourcemap: 'none'
     },
      files: {
        'dist/app.css': 'src/main.scss'
      }
    }
  },

   babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        app: {
            files: {
                'dist/app.js': ['dist/app.js']
            }
        }
    },

    browserify: {
      dist: {
        files: {
          'dist/app.js': 'dist/app.js'
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },

      app: {
        src: [
          'src/**/*.js',
        ],
        dest: 'dist/app.js',
      },

      upmath: {
        src: [
          'src/upmath/**/*.js',
        ],
        dest: 'dist/upmath.js',
      },

      lib: {
        src: [
          'vendor/*.js',
          "node_modules/markdown-it/dist/markdown-it.min.js",
          "node_modules/markdown-it-footnote/dist/markdown-it-footnote.min.js",
          "node_modules/markdown-it-task-lists/dist/markdown-it-task-lists.min.js",
          "node_modules/sn-components-api/dist/dist.js"
        ],
        dest: 'dist/lib.js',
      },

      dist: {
        src: ['dist/lib.js', 'dist/app.js'],
        dest: 'dist/dist.js',
      },

      css: {
        src: ['dist/app.css'],
        dest: 'dist/dist.css',
      }
    }
  });

  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['concat:app', 'concat:upmath', 'babel', 'browserify', 'concat:lib', 'concat:dist', 'sass', 'concat:css']);
};

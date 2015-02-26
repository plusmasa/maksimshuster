module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['_site/assets/js/main.js','_site/assets/css/main.css'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
      images: {
        files: ['_dev/assets/_img_src'],
        tasks: ['crunch']
      }
    },

    cssmin: {
      main: {
        files: [{
          expand: true,
          cwd: '_site/assets/css',
          src: ['main.css'],
          dest: '_site/assets/css',
          ext: '.min.css'
        }]
      }
    },

    uglify: {
      main: {
        files: [{
          expand: true,
          cwd: '_site/assets',
          src: 'js/main.concat.js',
          dest: '_site/assets/js/main.min.js'
        }]
      }
    },

    grunticon: {
      main: {
        files: [{
            expand: true,
            cwd: '_dev/assets/_img_src/svg',
            src: ['*.svg'],
            dest: "_dev/assets/css/svg/"
        }],
        options: {
          pngfolder: "fallbacks/",
          pngpath: "_dev/assets/img/"
        }
      }
    },

    svgmin: {
      main: {
        files: [{
            expand: true,
            cwd: '_dev/assets/_img_src/svg_src',
            src: ['*.svg'],
            dest: '_dev/assets/_img_src/svg'
        }]
      }
    },

    imagemin: {
        main: {
            files: [{
            	expand: true,
            	flatten: true,
            	cwd: '_dev/assets/',
            	src: ['_img_src/*.{png,jpg,gif}'],
            	dest: '_dev/assets/img/'
            }]
        },
        proj: {
            files: [{
              expand: true,
              flatten: true,
              cwd: '_dev/projects/',
              src: ['**/_img_src/*.{png,jpg,gif}'],
              dest: '_dev/projects/**/img/'
            }]
        } 
    }
    
  });

  // Load the plugin in parenthesis.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['newer:cssmin:main','newer:uglify:main']);

  // Specific tasks
  grunt.registerTask('crunch',['newer:imagemin:main', 'newer:grunticon:main']);
};
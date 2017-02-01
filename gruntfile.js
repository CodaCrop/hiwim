module.exports = function(grunt){
  grunt.initConfig({
     sass: {
         options: {
             outputStyle: 'compressed'  // - minified version
             // determines the output css style. There are also
             // 'nested' - heirarchical format
	           // 'compact' - normal format
             // 'expanded' - single line per selector format
         },
         dist: {
             files: [{
                 expand: true,
                 cwd: 'src/precomp',
                 src: ['**/*.scss'],
                 dest: 'src/css',
                 ext: '.css'
             }]
         }
     },
      watch: {
          sass: {
            files: ['src/precomp/**/*.scss'],
            tasks: ['sass']
          }
      }
  });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch', 'sass']);

};

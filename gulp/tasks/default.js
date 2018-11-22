var gulp = require('gulp');
var config = require('../config');
var gutil = require('gulp-util');

gulp.task('default', function () {
    gutil.log('Use one of the following commands:');
    gutil.log(gutil.colors.green('gulp dev'), ' - for development (watch + web server).');
    gutil.log(gutil.colors.green('gulp docs'), ' - for generating documentation.');
    gutil.log(gutil.colors.green('gulp font'), ' - for generating fonts.');
    gutil.log(gutil.colors.green('gulp sass'), ' - for generating style sheets.');
    gutil.log(gutil.colors.green('gulp scripts'), ' - for generating javascripts.');
    gutil.log(gutil.colors.green('gulp sprites'), ' - for generating sprite sheets.');
    gutil.log(gutil.colors.green('gulp watch'), ' - watches the folder for any changes (excutes task styles and sprites).');
});
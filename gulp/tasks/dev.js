var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('dev', ['watch'], function () {
    return gulp.src('./').pipe(webserver({
        livereload: true,
        open: true
    }));
});
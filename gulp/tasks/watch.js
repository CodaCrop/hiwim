var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', function () {
    gulp.watch([config.paths.css.all], ['sass']);
    gulp.watch([config.paths.scripts.all], ['scripts']);
    gulp.watch([config.paths.sprites.all], ['sprites']);
    gulp.watch([config.paths.docs.all, config.paths.docs.templates], ['docs']);
});
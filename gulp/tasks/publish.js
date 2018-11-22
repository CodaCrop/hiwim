var gulp = require('gulp');
var config = require('../config');
var gutil = require('gulp-util');

gulp.task('publish', ['sass', 'scripts'], function () {
    gutil.log(gutil.colors.green('Publishing to ' + config.release));
    gulp.src('./assets/fonts/teleicon-ui.*').pipe(gulp.dest('../../Portals/V2/' + config.release + '/Code/Platform/PublicPortal/Assets/Fonts'));
    gulp.src('./assets/javascripts/design-system.js').pipe(gulp.dest('../../Portals/V2/' + config.release + '/Code/Platform/PublicPortal/Assets/JavaScripts'));
    gulp.src('./assets/stylesheets/design-system.css').pipe(gulp.dest('../../Portals/V2/' + config.release + '/Code/Platform/PublicPortal/Assets/StyleSheets'));    
});
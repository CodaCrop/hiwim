var gulp = require('gulp');
var config = require('../config');
var consolidate = require('gulp-consolidate');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var rename = require('gulp-rename');

gulp.task('font', function () {
    gulp.src([config.paths.icons.sass.all])
        .pipe(iconfontCss({
            fontName: 'teleicon-ui',
            path: config.paths.icons.sass.template,
            targetPath: config.paths.icons.sass.dest,
            fontPath: config.paths.font.dest
        }))
        .pipe(iconfont({
            prependUnicode: true,
            fontName: 'teleicon-ui',
            formats: ['ttf', 'eot', 'woff', 'svg'],
            normalize: true,
            fontHeight: 1001
        }))
        .on('glyphs', function (glyphs, options) {
            gulp.src(config.paths.icons.sass.templateDoc)
               .pipe(consolidate('underscore', {
                   glyphs: glyphs,
                   fontName: options.fontName
               }))
               .pipe(rename('_icon.md'))
               .pipe(gulp.dest(config.paths.icons.sass.doc));
        })
        .pipe(gulp.dest('.' + config.paths.font.dest));
});
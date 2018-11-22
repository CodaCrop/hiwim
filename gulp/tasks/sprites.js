var gulp = require('gulp');
var config = require('../config');
var buffer = require('vinyl-buffer');
var imagemin = require('gulp-imagemin');
var mergestream = require('merge-stream');
var spritesmith = require('gulp.spritesmith');
var phantomjssmith = require('phantomjssmith');

gulp.task('sprites', function () {
    var spriteData = gulp.src('./assets/images/sprites/**/*.png', { read: false })
        .pipe(spritesmith({
            imgName: 'sprites.png',
            imgPath: '/assets/images/spritesheets/sprites.png',
            retinaImgName: 'sprites-2x.png',
            retinaImgPath: '/assets/images/spritesheets/sprites-2x.png',
            retinaSrcFilter: './assets/images/sprites/**/*-2x.png',
            cssName: '_mixins.scss',
            cssPath: '/sass/components/sprites/_mixins.scss',
            padding: 20
        }));

    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest('./assets/images/spritesheets'));

    var cssStream = spriteData.css.pipe(gulp.dest('./sass/components/sprites'));

    return mergestream(imgStream, cssStream);
});
const gulp = require('gulp');
const config = require('../config');
const del = require('del');
const sass = require('gulp-sass');
const sassUnicode = require('gulp-sass-unicode');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src(config.paths.css.all)        
        .pipe(sass().on('error', sass.logError))
        .pipe(sassUnicode())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(config.paths.css.dest));
});

gulp.task('clean:sass', function () {
    return del([config.paths.css.dest]);
});
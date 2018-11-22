var gulp = require('gulp');
var config = require('../config');
var typescript = require('gulp-typescript');

var typescriptProject = typescript.createProject('tsconfig.json', {
    "outFile": "design-system.js"
});

gulp.task('scripts', function () {
    return typescriptProject.src()
        .pipe(typescriptProject())
        .pipe(gulp.dest(config.paths.scripts.dest));
});
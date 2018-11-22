var gulp = require('gulp');
var config = require('../config');
var del = require('del');
var metalsmith = require('gulpsmith');
var metallic = require('metalsmith-metallic');
var helpers = require('handlebars-helpers')();
var collections = require('metalsmith-collections');
var frontmatter = require('metalsmith-matters');
var headings = require('metalsmith-headings');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var layouts = require('metalsmith-layouts');
var jquery = require('metalsmith-jquery');

gulp.task('docs', ['clean:docs'], function () {
    return gulp.src(config.paths.docs.all)
        .pipe(metalsmith()
            .use(frontmatter())
            .use(metallic())
            .use(collections({
                Core: {
                    pattern: 'core/**/*.md',
                    sortBy: 'title'
                },
                Components: {
                    pattern: 'components/**/*.md',
                    sortBy: 'title'
                },
                Layout: {
                    pattern: 'layout/**/*.md',
                    sortBy: 'title'
                },
                Utilities: {
                    pattern: 'utilities/**/*.md',
                    sortBy: 'title'
                }
            }))
            .use(markdown({
                gfm: true,
                smartypants: true,
                smartLists: true,
                tables: true
            }))
            .use(jquery(function ($) {
                $('table:not([class])').addClass('doc-table');
            }))
            .use(headings('h2'))
            .use(permalinks({
                pattern: ':collection/:title'
            }))
            .use(layouts({
                engine: 'handlebars',
                directory: './documentation/_layouts',
                partials: './documentation/_partials',
                partialExtension: '.html',
                default: 'docs.html'
            })))
        .pipe(gulp.dest(config.paths.docs.dest));
});

gulp.task('clean:docs', function () {
    return del(['documentation/**/*', '!documentation/_*/**']);
});
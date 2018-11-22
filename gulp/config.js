module.exports = {
    release: 'R1813',
    paths: {
        css: {
            all: './sass/**/*.scss',
            dest: './assets/stylesheets'            
        },
        docs: {
            all: './sass/**/*.md',
            dest: './documentation',
            templates: './documentation/_**/*.html'
        },
        font: {
            dest: '/assets/fonts/'
        },
        icons: {
            sass: {
                all: './icons/*.svg',
                dest: '../../sass/core/icon/_icon.scss',
                doc: './sass/core/icon',
                template: 'sass/core/icon/_template.scss',
                templateDoc: 'sass/core/icon/_template.html'
            }
        },
        scripts: {
            all: ['./typescript/**/*.ts'],
            dest: './assets/javascripts'
        },
        sprites: {
            all: './images/sprites/**/*.png'
        }
    }
};
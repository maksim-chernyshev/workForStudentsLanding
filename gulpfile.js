const {src, dest, parallel, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');

function browsersync() {
    browserSync.init({
        server: {baseDir: 'public/'},
        notify: false,
        online: true
    })
}

exports.browsersync = browsersync;

exports.styles = styles;

exports.default = parallel(styles, scripts, browsersync, startwatch);

function styles() {
    return src('src/css/main.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(concat('main.min.css'))
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
        .pipe(cleancss({level: {1: {specialComments: 0}}/* , format: 'beautify' */}))
        .pipe(dest('public/css/'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src('src/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('public/js/'))
        .pipe(browserSync.stream())
}

function startwatch() {
    watch(['src/**/*.js', '!src/**/*.min.js'], scripts);
    watch('src/css/**/*.scss', styles);
    watch('public/**/*.html').on('change', browserSync.reload);
}

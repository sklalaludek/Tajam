const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({erroLogToConsole: true, outputStyle: 'expanded'}))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({browsers: ['> 1%'], cascade: false}))
    .pipe(gulp.dest('css'))
});

gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
});

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"));
};

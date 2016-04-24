var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var streamify = require('gulp-streamify');
var reactify = require('reactify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
// var debowerify = require('debowerify');
// var shim = require('browserify-shim');


module.exports = function(){
  return browserify({
        entries: './src/js/app.js',
        debug: true
    })
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      // .pipe(jshint())
      // .pipe(jshint.reporter(stylish))
    //   .pipe(sourcemaps.init({loadMaps: true}))
    //   .pipe(uglify())
    //   .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js/'));
};

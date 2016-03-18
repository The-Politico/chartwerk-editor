var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var streamify = require('gulp-streamify');
var reactify = require('reactify');


module.exports = function(){
  return browserify({
        entries: ['./src/js/app.js'],
        transform: [reactify],
    })
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(streamify(uglify()))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js/'));
};

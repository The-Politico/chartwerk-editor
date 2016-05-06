var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var streamify = require('gulp-streamify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var watchify = require('watchify');
var gutil = require('gulp-util');


module.exports = function(){

  var props = {
        entries: './src/js/app.js',
        extensions: ['.js','.jsx'],
        cache: {},
        packageCache: {},
        debug: true
  };

  var bundler = watchify(browserify(props));

  bundler.on('log', gutil.log);
  bundler.on('update', bundle);

  function bundle() {
    return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    // .pipe(jshint())
    // .pipe(jshint.reporter(stylish))
    // .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(uglify())
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
  }

  return bundle();
};

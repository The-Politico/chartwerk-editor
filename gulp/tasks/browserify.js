const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const watchify = require('watchify');
const gutil = require('gulp-util');
const babelify = require('babelify');
const util = require('gulp-util');

module.exports = () => {
  const props = {
    entries: './src/js/app.js',
    extensions: ['.js', '.jsx'],
    cache: {},
    packageCache: {},
    debug: true,
  };

  const bundler = watchify(browserify(props).transform(babelify, {
    global: !!util.env.production,
    presets: ['es2015', 'react'],
    ignore: !!util.env.production ? /\/node_modules\/(?!react)/ : null, // transform react modules
  }));

  function bundle() {
    return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(!!util.env.production ? sourcemaps.init({ loadMaps: true }) : util.noop())
    .pipe(!!util.env.production ?
      uglify({ mangle: false, compress: true }).on('error', gutil.log) : util.noop()
    )
    .pipe(!!util.env.production ? sourcemaps.write('./') : util.noop())
    .pipe(gulp.dest('./dist/js/'));
  }

  bundler.on('log', gutil.log);
  bundler.on('update', bundle);

  return bundle();
};

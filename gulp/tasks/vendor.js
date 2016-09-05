const gulp = require('gulp');
const bundle = require('gulp-bundle-assets');


module.exports = () =>
    gulp.src('./gulp/tasks/vendor.bundle.config.js')
      .pipe(bundle())
      .pipe(gulp.dest('./dist'));

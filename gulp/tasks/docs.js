const gulp = require('gulp');
const documentation = require('gulp-documentation');

module.exports = () =>
  gulp.src('src/**/*.js*')
    .pipe(documentation({ format: 'md' }))
    .pipe(gulp.dest('docs/md'));

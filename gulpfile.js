const util = require('gulp-util');

process.env.NODE_ENV = !!util.env.production ? 'production' : 'development';

const gulp = require('./gulp')([
  'nunjucks',
  'sass',
  'browserify',
  'server',
  'vendor',
  'docs',
]);

gulp.task('build', ['nunjucks', 'sass', 'browserify', 'server']);
gulp.task('default', ['build']);

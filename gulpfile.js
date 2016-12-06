const util = require('gulp-util');

process.env.NODE_ENV = !!util.env.production ? 'production' : 'development';

const gulp = require('./gulp')([
  'nunjucks',
  'sass',
  'browserify',
  'server',
  'vendor',
  'docs',
  'api',
]);

gulp.task('build', ['nunjucks', 'sass', 'browserify', 'server', 'api']);
gulp.task('default', ['build']);

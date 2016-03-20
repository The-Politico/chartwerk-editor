var gulp = require('./gulp')([
    'nunjucks',
    'sass',
    'browserify',
    'server',
    'vendor'
]);

gulp.task('build', ['nunjucks','sass','browserify','server']);
gulp.task('default', ['build']);

var gulp        = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');

module.exports = function () {
  return gulp.src('src/templates/*.html')
    .pipe(nunjucksRender({
      path: ['src/templates/'] // String or Array
    }))
    .pipe(gulp.dest('dist'));
};

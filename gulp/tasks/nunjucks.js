var gulp        = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');

module.exports = function() {
  return gulp.src('src/templates/index.html')
    .pipe(nunjucksRender({
      path: ['src/templates/']
    }))
    .pipe(gulp.dest('dist'));
};

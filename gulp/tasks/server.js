var browserSync = require('browser-sync').create();
var gulp        = require('gulp');

module.exports = function(){

  browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });


  gulp.task('sass-re',['sass'], function(){ browserSync.reload(); });
  gulp.watch(['./src/scss/**/*.scss'], ['sass-re']);

  gulp.task('nunjucks-re',['nunjucks'], function(){ browserSync.reload(); });
  gulp.watch(['./src/templates/**/*.html'], ['nunjucks-re']);

  gulp.task('js-re', ['browserify'], function(){ browserSync.reload(); });
  gulp.watch(['./src/js/**/*.js'], ['js-re']);

};

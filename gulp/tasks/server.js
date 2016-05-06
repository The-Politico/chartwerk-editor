var browserSync = require('browser-sync').create();
var gulp        = require('gulp');

module.exports = function(){

  browserSync.init({
        files: ['./dist/**/*'],
        server: {
            baseDir: "./dist/"
        },
        ghostMode: false
    });

  gulp.watch(['./src/templates/**/*.html'], ['nunjucks']);
  gulp.watch(['./src/scss/**/*.scss'], ['sass']);

};

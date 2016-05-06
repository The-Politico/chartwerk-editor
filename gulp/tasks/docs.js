var gulp        = require('gulp');
var documentation = require('gulp-documentation');

module.exports = function() {
    return gulp.src("src/**/*.js*")
        .pipe(documentation({ format: 'md' }))
        .pipe(gulp.dest("docs/md"));
};

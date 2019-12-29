const gulp = require('gulp');

gulp.task('default', (done) => {
    gulp.src(`node_modules/kst-util/dist/umd/kst.min.js`)
        .pipe(gulp.dest('public'))
    done();
})

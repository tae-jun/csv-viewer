var gulp = require('gulp'),
    tsc = require('gulp-tsc'),
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence'),
    gls = require('gulp-live-server'),
    del = require('del');

var config = require('./gulp-config'),
    src = config.src,
    tscOptions = config.tscOptions;

gulp.task('default', function (cb) {
    runSequence('clean', 'build', cb);
});

gulp.task('build', ['build:ts']);

gulp.task('build:ts', function () {
    return gulp.src(src.ts, {base: '.'})
        .pipe(plumber())
        .pipe(tsc(tscOptions))
        .pipe(gulp.dest('.'));
});

gulp.task('clean', function (cb) {
    del(['src/**/*.js'], cb);
});

gulp.task('watch', function () {

    gulp.watch(src.ts, function () {
        runSequence('build:ts');
    });
});

gulp.task('server', function () {
    //customize livereload server, e.g. port number
    var server = gls('src/app.js', undefined, false);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch(src.js, server.start); //restart my server
    gulp.watch(src.ts, ['build:ts']);
});
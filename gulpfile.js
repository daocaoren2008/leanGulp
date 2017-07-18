var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
gulp.task('js', function () {
    gulp.src('./src/js/*.js')
        .pipe($.concat('all.js'))
        //貌似使用.babelrc文件预设不成功
        .pipe($.babel({presets: 'es2015'}))
        .pipe(gulp.dest('./build/js'))
        .pipe($.uglify())//混淆压缩
        .pipe($.rename(function (file) {
            file.basename += '.min';
        }))//重命名
        .pipe(gulp.dest('./build/js'))
});
gulp.task('css', function () {
    gulp.src('./src/less/*.less')
        .pipe($.less())
        .pipe($.concat('all.css'))//合并成一个文件
        .pipe(gulp.dest('./build/css'))
        .pipe($.cleanCss())
        .pipe($.rename(function (file) {
            file.basename += '.min';
        }))
        .pipe(gulp.dest('./build/css'))
});
gulp.task('img', function () {
    gulp.src('./src/imgs/*')
        .pipe(gulp.dest('./build/imgs'))
});
gulp.task('html', function () {
    var source = gulp.src('./src/index.html');
    var resource = gulp.src(['build/js/all.min.js', 'build/css/all.min.css']);
    source.pipe($.inject(resource, {addRootSlash: false, ignorePath: 'build'}))
        .pipe(gulp.dest('./build'))
});
//服务任务
gulp.task('serve',function () {
    $.connect.server({
        port:8080,
        root:'./build',
        livereload:true
    })
});
gulp.task('watch',function () {
    gulp.watch('./build/index.html',['html']);
});
gulp.task('default', ['js', 'css', 'img',
    'html', 'serve', 'watch']);
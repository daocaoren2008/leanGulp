var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');

gulp.task('js', function () {
    return gulp.src('src/js/*.js')//指定要处理的文件
        .pipe(plumber())
        .pipe(babel({presets:['es2015']}))
        .pipe(concat('all.js'))//合并成一个文件
        .pipe(gulp.dest('build/js'))//保存此文件
        .pipe(uglify())//进行压缩
        .pipe(rename('all.min.js'))//对此文件进行重命名
        .pipe(gulp.dest('build/js'));//再输出一次
});


gulp.task('css', function () {
    return gulp.src('src/less/*.less')//指定 less文件
        .pipe(less())//把less编译成css
        .pipe(concat('all.css'))//合并成一个文件
        .pipe(gulp.dest('build/css'))//输出到目的地
        .pipe(minifyCss())//对 css再进行压缩
        .pipe(rename('all.min.css'))//重命名
        .pipe(gulp.dest('build/css'));//输出到目的地
});

gulp.task('images', function () {
    return gulp.src('src/imgs/**/*.{jpg,png}')//指定要压缩的图片
        .pipe(gulp.dest('build/imgs'));//输出目的地
});

gulp.task('html', function () {
    var source = gulp.src(['build/css/all.min.css', 'build/js/all.min.js']);
    return gulp.src('src/index.html')
        .pipe(inject(source,{ignorePath: '/build'}))
        .pipe(minifyHtml())
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch('src/index.html', ['html']);//当index.html文件变化时执行copy-html任务
});

gulp.task('server', function () {
    connect.server({
        root: 'build',//服务器的根目录
        port: 8080, //服务器的地址，没有此配置项默认也是 8080
        livereload: true//启用实时刷新的功能
    });
});
gulp.task('default', ['js', 'css', 'images', 'html', 'server', 'watch']);//运行此任务的时候会在8080上启动服务器，
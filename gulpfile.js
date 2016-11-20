var gulp   = require("gulp");

var server = require("gulp-server-livereload");
var useref = require("gulp-useref");
var gulpif = require("gulp-if");
var csso   = require("gulp-csso");
var uglify = require("gulp-uglify");
var clean = require('gulp-dest-clean');
var imagemin = require('gulp-imagemin');
 
var imgSrc = 'src/images/**';
var imgDest = 'build/images';

gulp.task('server', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('default', () =>
    gulp.src('app/images/**/*.*')
        .pipe(imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()]))
        .pipe(gulp.dest('build/images'))
);


gulp.task('replaceFonts', function(){
    gulp.src('./app/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'))
});

//build task
gulp.task('build', ['replaceFonts', 'default'] ,function () {
    gulp.src('./app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('build'));
});

const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const rename      = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');

// const cleanCSS = require('gulp-clean-css');
// const autoprefixer = require('gulp-autoprefixer'); его не получилось усьановить
// const rename = require("gulp-rename");

gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "src"
        }
    }); // gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
          }))
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions']
		// 	cascade: false
		// }))
        // .pipe(autoprefixer({ он не работает потому что автопрефикс ставится иначе
		// 	cascade: false
		// }))  
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
        
/*         .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream()); */
});



gulp.task('watch', function() {
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));

/* function defaultTask(cb) {
    // place code for your default task here
    cb();
  }
  
  exports.default = defaultTask */
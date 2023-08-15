const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cssMinify = require("gulp-clean-css");
const jsMinify = require("gulp-terser");
const browserSync = require("browser-sync");
const babel = require("gulp-babel");

function styles() {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer("last 4 versions"))
    .pipe(cssMinify())
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src("./src/js/*.js")
    .pipe(babel())
    .pipe(jsMinify())
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
}

function watchTask() {
  browserSync.init({
    server: "./",
  });

  gulp.watch(
    ["./src/scss/**/*.scss", "./src/js/*.js", "./*.html"],
    gulp.series(styles, scripts)
  );
}

exports.default = gulp.series(styles, scripts, watchTask);
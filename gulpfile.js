const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const del = require('del');
const zip = require('gulp-zip');

// ---------------------------------- //
// HANDLEBARS LIBRARIES:
const handlebars = require('gulp-handlebars');
const handlebarsLib = require('handlebars');
const declare = require('gulp-declare'); // Create variables in gulp
const wrap = require('gulp-wrap'); // Wrap files in a set of code

// ---------------------------------- //
// IMAGE COMPRESSION LIBRARIES:
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

// ---------------------------------- //
// FILE PATHS:
const DIST_PATH = './public/dist';
const CSS_PATH = './public/css/**/*.css';
const SCSS_PATH = './public/scss/**/*.scss';
const SCRIPTS_PATH = './public/scripts/**/*.js';
const TEMPLATES_PATH = './templates/**/*.hbs';
const IMAGES_PATH = './public/images/**/*.{png,jpeg,jpg,svg,gif}';

// ---------------------------------- //
// STYLES FOR CSS (e.g., minification, concatenation, managing vendor prefixes):

/**
 * First parameter is the name used to run the task from the CLI;
 * second parameter is the function to be called when running the task:
 */
gulp.task('stylesCSS', () => {
  console.log('Running stylesCSS task');

  /**
   * src() allows you to load files from your project into gulp; pipe() chains a
   * function's output into another function; dest() specifies where the final
   * output file will be saved.  By using an array in src(), you can specify
   * the load order (any file that has already been loaded will be ignored
   * if repeated in the array):
   */
  return gulp
    .src(['./public/css/reset.css', CSS_PATH])
    .pipe(plumber(err => handleError(err, 'stylesCSS'))) // Must be first pipe()
    .pipe(sourcemaps.init()) // Must occur prior to concatenation/minification
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(cleanCSS({ compatability: 'ie8' }))
    .pipe(sourcemaps.write()) // Writes init() data to new file
    .pipe(gulp.dest(DIST_PATH + '/css'));
});

// ---------------------------------- //
// STYLES FOR SCSS:
gulp.task('styles', () => {
  console.log('Running styles task');

  /**
   * concat() and cleanCSS() above are not necessary here, because their
   * functions are performed by SASS:
   */
  return gulp
    .src('./public/scss/styles.scss')
    .pipe(plumber(err => handleError(err, 'styles')))
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        // Performs minification:
        outputStyle: 'compressed'
      })
    )
    .pipe(autoprefixer()) // Must go after sass()
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH + '/css'));
});

// ---------------------------------- //
// SCRIPTS (e.g., minification, concatenation, compiling/transpiling):
gulp.task('scripts', () => {
  console.log('Running scripts task');

  return gulp
    .src(SCRIPTS_PATH)
    .pipe(plumber(err => handleError(err, 'scripts')))
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH + '/js'));
});

// ---------------------------------- //
// IMAGES (e.g., compression):
gulp.task('images', () => {
  console.log('Running images task');

  // imagemin() takes an array of plugins as an optional argument:
  return gulp
    .src(IMAGES_PATH)
    .pipe(
      imagemin(
        // First 4 are imagemin defaults (must include if using array argument):
        [
          imagemin.gifsicle(),
          imagemin.jpegtran(),
          imagemin.optipng(),
          imagemin.svgo(),
          imageminPngquant(),
          imageminJpegRecompress()
        ]
      )
    )
    .pipe(gulp.dest(DIST_PATH + '/images'));
});

// ---------------------------------- //
// TEMPLATES:
gulp.task('templates', () => {
  console.log('Running templates task');

  return gulp
    .src(TEMPLATES_PATH)
    .pipe(
      handlebars({
        // Sets the version of handlebars to use in compiling templates:
        handlebars: handlebarsLib
      })
    )
    .pipe(wrap('Handlebars.template(<%= contents %>)')) // Registers template
    .pipe(
      declare({
        // Provides access to handlebars templates via "templates" variable:
        namespace: 'templates',
        noRedeclare: true // Prevents reassignment
      })
    )
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(DIST_PATH + '/js'));
});

// ---------------------------------- //
// CLEAN (deletes specified files/folders):
gulp.task('clean', () => {
  console.log('Running clean task');

  return del.sync([DIST_PATH]);
});

// ---------------------------------- //
// EXPORT (performs ZIP compression on specified files):
gulp.task('export', () => {
  console.log('Running export task');

  return gulp
    .src('./public/**/*')
    .pipe(zip('website.zip'))
    .pipe(gulp.dest('./'));
});

// ---------------------------------- //
// DEFAULT (executes when you run gulp from the terminal without a task name):

// Second parameter can be (but is not required to be) an array of tasks to run:
gulp.task(
  'default',
  ['clean', 'images', 'templates', 'styles', 'scripts'],
  () => {
    // After the tasks in the array have completed, then the following will run:
    console.log('Running default task');
  }
);

// ---------------------------------- //
// WATCH (runs when there is a change to the specified path):
gulp.task('watch', ['default'], () => {
  console.log('Running watch task');

  /**
   * First parameter is the path; second parameter is an array of tasks to run:
   */
  gulp.watch(SCSS_PATH, ['styles']);
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  gulp.watch(TEMPLATES_PATH, ['templates']);
});

// ---------------------------------- //
// HELPER FUNCTION(S):
function handleError(err, taskNameStr) {
  console.log(`${taskNameStr} task error`);
  console.log(err);
  // Stops task once an error occurs, without crashing gulp "watch" task:
  gulp.emit('end');
}

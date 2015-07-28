var gulp        = require('gulp')
  , browserify  = require('browserify')
  , source      = require('vinyl-source-stream')
  , buffer      = require('vinyl-buffer')
  , uglify      = require('gulp-uglify')
  , concat      = require('gulp-concat')
  , sourcemaps  = require('gulp-sourcemaps')
  , mocha       = require('gulp-mocha');

var PROJECT_NAME  = 'ncbi-eutils'
  , ENTRY_FILE    = './src/index.js'
  , BUILD_FILE    =  PROJECT_NAME + '.js'
  , DIST_FILE     =  PROJECT_NAME + '.min.js'
  , DIST_FOLDER   = './'
  , TEST_FILE     = './test/test.js';


var b = browserify({
  entries: [ENTRY_FILE],
  debug: true
});

b.require(ENTRY_FILE, {expose: PROJECT_NAME});

gulp.task('default', ['build-browser-dev', 'build-browser-release']);

gulp.task('build-browser-dev', function() {
  return b.bundle()
    .pipe(source(BUILD_FILE))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('build-browser-release', function() {
  return b.bundle()
    .pipe(source(DIST_FILE))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('test', function() {
  return gulp.src(TEST_FILE, {read:false})
    .pipe(mocha({reporter: 'list'}));
});
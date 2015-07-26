var gulp        = require('gulp')
  , browserify  = require('browserify')
  , source      = require('vinyl-source-stream')
  , buffer      = require('vinyl-buffer')
  , uglify      = require('gulp-uglify')
  , concat      = require('gulp-concat')
  , sourcemaps  = require('gulp-sourcemaps');

var PROJECT_NAME  = 'ncbi-eutils'
  , ENTRY_FILE    = './index.js'
  , BUILD_FILE    =  PROJECT_NAME + '.js'
  , DIST_FILE     =  PROJECT_NAME + '.min.js'
  , DIST_FOLDER   = './'


var b = browserify({
  entries: [ENTRY_FILE],
  debug: true
});

b.require(ENTRY_FILE, {expose: PROJECT_NAME});

gulp.task('default', ['build', 'release']);


gulp.task('build', function() {
  return b.bundle()
    .pipe(source(BUILD_FILE))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('release', function() {
  return b.bundle()
    .pipe(source(DIST_FILE))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(DIST_FOLDER));
});
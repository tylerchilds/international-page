// Include gulp
var gulp = require('gulp');

// node file system
var fs = require('fs');

// Include Our Plugins
var util      = require('gulp-util'),
  jshint      = require('gulp-jshint'),
  compass     = require('gulp-compass'),
  concat      = require('gulp-concat'),
  uglify      = require('gulp-uglify'),
  rename      = require('gulp-rename'),
  imagemin    = require('gulp-imagemin'),
  pngquant    = require('imagemin-pngquant'),
  clean       = require('gulp-clean'),
  swig        = require('gulp-swig'),
  include     = require('gulp-include'),
  minify      = require('gulp-minify-css'),
  runSequence = require('run-sequence'),
  yaml        = require('gulp-yaml'),
  minimist    = require('minimist'),
  preprocess  = require('gulp-preprocess'),
  zip         =require('gulp-zip');

ENVIRONMENTS = {
  local: {
    mixpanel_token: "fc24944e1cccb0b01202e223e294eca6"
  },
  beta: {
    mixpanel_token: "1aca06e57845a1231445642c2cf1dfe9"
  },
  preprod: {
    mixpanel_token: "b1604bd3cd52e370834f568dffd128e5"
  },
  prod: {
    // we want to keep production mixpanel token hidden
    mixpanel_token: 'e1b21fa8aed1da4c0109dfc44b7e3a35'
  }
};

ASSETS_PATH = 'assets/';
DEPLOY_ENV = ENVIRONMENTS.prod;

var config = {
   bowerDir: './bower_components' 
};

var args = {
  string: 'bower',
  default: { bower: process.env.NODE_ENV || 'default' }
};

var config = minimist(process.argv.slice(2), args);

var bower_locations = {
  default: './bower_components' ,
  local: '../'
};

config.bowerDir = bower_locations[config.bower];

// Lint Task
gulp.task('lint', function() {
  return gulp.src('./assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('compass_min', function() {
  return gulp.src('./assets/sass/application.scss')
    .pipe(compass({
      sourcemap: true,
      sass: './assets/sass',
      css: './public/' + ASSETS_PATH,
      import_path: config.bowerDir + '/id-bower/src/sass'
    }))
    .pipe(minify())
    .pipe(gulp.dest('./public/' + ASSETS_PATH));
});

gulp.task('compass', function() {
  return gulp.src('./assets/sass/application.scss')
    .pipe(compass({
      sourcemap: true,
      sass: './assets/sass',
      css: './public/' + ASSETS_PATH,
      import_path: config.bowerDir + '/id-bower/src/sass'
    }))
    .pipe(gulp.dest('./public/' + ASSETS_PATH));
});

// Concatenate & Minify JS
gulp.task('scripts_min', function() {
  return gulp.src([
      config.bowerDir + '/id-bower/public/js/id-bower.js',
      './assets/js/main.js'
    ])
    .pipe(include())
    .pipe(uglify())
    .pipe(concat('international.js'))
    .pipe(gulp.dest('./public/' + ASSETS_PATH + "javascripts/"));
});

gulp.task('scripts', function() {
  return gulp.src([
      config.bowerDir + '/id-bower/public/js/id-bower-backbone.js',
      './assets/js/main.js'
    ])
    .pipe(include())
    .pipe(concat('international.js'))
    .pipe(gulp.dest('./public/' + ASSETS_PATH + "javascripts/"));
});

gulp.task('img', function(){
  return gulp.src('./assets/images/**/*.*')
    .pipe(gulp.dest('./public/' + ASSETS_PATH + 'images'));
});

// Move fonts
gulp.task('public', function(){
  return gulp.src([
    config.bowerDir + '/id-bower/public/**/*.*'
    ])
    .pipe(gulp.dest('./public/' + ASSETS_PATH ));
});

// create add json to template
gulp.task('addtext', function(){
  return gulp.src('./assets/*.yml')
    .pipe(yaml({space: 2}))
    .pipe(gulp.dest('./'));
});

// Compile Templates
gulp.task('index', ['addtext'], function(){

  gulp.src('./assets/index.html')
    .pipe(swig({
      defaults: {
        cache: false,
        locals: {
          mixpanel_token: DEPLOY_ENV.mixpanel_token,
          asset_path: ASSETS_PATH,
          text: require('./international.json')
        }
      },
      setup: function(swig){
        swig.setFilter("assetPath", assetPath);
      }
    }))
    .pipe(gulp.dest('./public/'));
});

// Clean build
gulp.task('clean', function() {
  return gulp.src([
      './public',
      './international.zip'
    ])
    .pipe(clean({force: true}));
});

// Watch Files For Changes
gulp.task('watch', function() {

  gulp.watch(config.bowerDir, ['public', 'scripts', 'compass']);
  gulp.watch('./assets/js/**/*.js', ['lint', 'scripts']);
  gulp.watch('./assets/sass/**/*.scss', ['compass']);
  gulp.watch(['./assets/html/**/*.html', "./assets/index.html"], ['index']);
});

gulp.task('default', ['compile'], function(){
  runSequence('watch');
});

gulp.task('compile', function(){
  return runSequence('clean', 'img', ['compass', 'scripts', 'public'], 'index', 'watch');
});

assetPath = function (input) {
  return ASSETS_PATH + input;
};

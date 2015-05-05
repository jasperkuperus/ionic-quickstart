// Imports
var _              = require('lodash');
var gulp           = require('gulp');
var bower          = require('bower');
var mainBowerFiles = require('main-bower-files');
var config         = require('./gulp-config.js');

// Plugin registration
gulp.$ = require('gulp-load-plugins')();
gulp.$.help(gulp);

// Config
// If set to true, tasks using runAndWatch will register watch tasks
var WATCHING = false;

// Composite tasks
gulp.task('emulate', 'Start ionic emulator',          ['watch', 'ionic-emulate']);
gulp.task('serve',   'Start ionic webserver @:8100',  ['watch', 'ionic-serve']);
gulp.task('compile', 'Compile the whole app',         ['bower-install', 'index', 'assets', 'vendor', 'templates', 'logic', 'style']);

// General
gulp.task('default', 'Alias for this help menu', ['help']);

// Ionic
gulp.task('ionic-serve', false, ['compile'], function() {
  runIonic('serve');
});

gulp.task('ionic-emulate', false, ['compile'], function() {
  runIonic('emulate', '-l', '--address=localhost');
});

// Watch
gulp.task('watch', 'Set gulp in watch mode', function() {
  WATCHING = true;
});

// Logic
gulp.task('logic', 'Compile all JS logic', function() {
  runAndWatch(config.logic.src, function() {
    gulp.src(config.logic.src)
    .pipe(gulp.$.concat(config.logic.bundle))
    .pipe(gulp.dest(config.logic.dest));
  });
});

// Style
gulp.task('style', 'Compile all scss', ['bower-install'], function() {
  runAndWatch(config.style.watch, function() {
    gulp.src(config.style.src)
    .pipe(gulp.$.sass({
      onError: logError
    }))
    .pipe(gulp.$.rename(config.style.bundle))
    .pipe(gulp.dest(config.style.dest))
  });
});

// Assets
gulp.task('assets', 'Copy assets to compile dir', function() {
  runAndWatch(config.assets.src, function() {
    gulp.src(config.assets.src)
    .pipe(gulp.dest(config.assets.dest));
  });
});

gulp.task('vendor', 'Copies all vendor main files to www/lib', ['bower-install'], function() {
  runAndWatch(config.vendor.watch, function() {
    gulp.src(mainBowerFiles(), { base: 'bower_components' })
    .pipe(gulp.dest(config.vendor.dest));
  });
});

// HTML
gulp.task('index', 'Copy index.html', function() {
  runAndWatch(config.index.src, function() {
    gulp.src(config.index.src)
    .pipe(gulp.dest(config.index.dest));
  });
});

gulp.task('templates', 'Compile templates to Angular templateCache', function() {
  runAndWatch(config.templates.src, function() {
    gulp.src(config.templates.src)
    .pipe(gulp.$.filter(['**', '!index.html']))
    .pipe(gulp.$.print())
    .pipe(gulp.$.ngTemplates({
      filename: config.templates.bundle,
      module: config.templates.moduleName,
      standalone: config.templates.newModule
    }))
    .pipe(gulp.dest(config.templates.dest));
  });
});

// Vendor stuff
gulp.task('bower-install', 'Run bower install', function(done) {
  bower.commands.install()
  .on('error', function(error) {
    gulp.$.util.log(gulp.$.util.colors.red('Error (bower):'), error.message);
  })
  .on('end', done.bind(null, null));
});

// Cleanup
gulp.task('clean', 'Clean the dist (' + config.dist.dest + ') folder', function() {
  gulp.src(config.dist.dest)
  .pipe(gulp.$.rimraf());
});

// General functions
/**
 * Simple error logging function
 */
function logError(error) {
  gulp.$.util.log(gulp.$.util.colors.red('Error:'), error);
}

/**
 * Shortcut for running a callback and registering a watch task for this callback
 * if WATCHING is enabled, which is enabled by running gulp watch, so e.g.:
 *   gulp watch compile
 */
function runAndWatch(paths, callback) {
  callback();

  if(WATCHING) {
    gulp.$.watch(paths, callback);
  }
}

/**
 * Runs an ionic command. If you need more ionic arguments, just pass them, they'll
 * be picked up, e.g.: runIonic('emulate', 'ios', '-l'). Unfortunately, ionic has
 * made a pure CLI, not an API with a CLI on top of it.
 */
function runIonic(command) {
  var argIndex = 2;
  var argBack = process.argv;

  // If it's a cordova argument, add it, rename command to cordova
  if(_.contains(['emulate'], command)) {
    process.argv[argIndex++] = command;
    command = 'cordova';
  }

  // Set other optional arguments
  _.each(_.tail(arguments), function(argument) {
    process.argv[argIndex++] = argument;
  })

  // Require the necessary ionic stuff, run it
  var ionic   = require('ionic/lib/ionic').Ionic;
  var command = require('ionic/lib/ionic/' + command).IonicTask;
  new command().run(ionic)

  // Reset arg backup
  process.argv = argBack;
}
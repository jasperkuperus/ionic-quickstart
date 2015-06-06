// Imports
var _              = require('lodash');
var del            = require('del');
var gulp           = require('gulp');
var bower          = require('bower');
var mainBowerFiles = require('main-bower-files');
var config         = require('./gulp-config.js');
var spawn          = require('child_process').spawn;
var spawnSync      = require('child_process').spawnSync;

// Plugin registration
gulp.$ = require('gulp-load-plugins')();
gulp.$.help(gulp);

// Config
// If set to true, tasks using runAndWatch will register watch tasks
var WATCHING = false;

// Composite tasks
gulp.task('emulate',   'Start ionic emulator',                    ['watch', 'ionic-emulate']);
gulp.task('serve',     'Start ionic webserver @:8100',            ['watch', 'ionic-serve']);
gulp.task('compile',   'Compile the whole app',                   ['bower-install', 'index', 'assets', 'vendor', 'templates', 'logic', 'style']);
gulp.task('clean-all', 'Cleans ALL implicitly created resources', ['clean', 'clean-ionic', 'clean-dependencies']);

// General
gulp.task('default', 'Alias for this help menu', ['help']);

// Ionic
gulp.task('ionic-serve', false, ['compile'], function() {
  runIonic('serve');
});

gulp.task('ionic-emulate', false, ['compile'], function() {
  runIonic('emulate', '--livereload', '--all');
});

gulp.task('ionic-state-restore', false, function() {
  runIonic('state', 'restore', { sync: true });
});

// Watch
gulp.task('watch', 'Set gulp in watch mode', function() {
  WATCHING = true;
});

// Logic
gulp.task('logic', 'Compile all JS logic', function() {
  runAndWatch(config.logic.src, function() {
    gulp.src(config.logic.src)
    .pipe(gulp.$.sourcemaps.init())
    .pipe(gulp.$.coffee({ bare: true }))
    .pipe(gulp.$.concat(config.logic.bundle))
    .pipe(gulp.$.sourcemaps.write('./'))
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
gulp.task('clean', 'Clean the dist (' + config.dist.dest + ') folder', function(cb) {
  del([config.dist.dest], cb);
});

gulp.task('clean-ionic', 'Cleans ionic generated folders like `hooks`, `platforms`, `plugins`', function(cb) {
  del(config.ionicPaths, cb);
});

gulp.task('clean-dependencies', 'Cleans all dependencies folders, `bower_components` and `node_modules`', function(cb) {
  gulp.$.util.log(gulp.$.util.colors.red('WARNING:'), 'Please note that clean-dependencies also cleans `node_modules`! An `npm install` is required after this!');
  del(config.dependencyPaths, cb);
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
 * Runs an ionic command, just pass all arguments for ionic to this function,
 * it'll be mapped to a command line call, e.g.: runIonic('emulate', 'ios', '-l').
 *
 * Unfortunately, ionic has made a pure CLI, not an API with a CLI on top of it.
 * Therefore, we spawn a subprocess. First we tried running Ionic by using their
 * code-separated commands. However, they heavily rely on process.argv and do not
 * consistently return a promise for when the command is done. Therefore, running
 * two subsequent commands was not possible using that approach.
 *
 * @param {object} [options] If last arg is given an object, it is parsed as an
 *                           options argument:
 *                           {
 *                             sync: false, // Run this command sync in stead of async
 *                           }
 */
function runIonic() {
  var spawnFn = spawn;

  // If last argument is an object, treat it as options
  if(_.isObject(_.last(arguments))) {
    var options = _.last(arguments);

    // If options.sync is set to true, make sure the command run in sync
    if(options.sync === true) {
      spawnFn = spawnSync;
    }
  }

  // Call the ionic cmd as child process
  spawnFn('ionic', _.values(arguments), { stdio: 'inherit' });
}
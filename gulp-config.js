/**
 * This file contains the configuration for the gulp setup. You
 * can change paths, filenames, modulenames, globs, etc. here.
 */
var DIST_PATH = './www';

module.exports = {
  // Dist build config
  dist: {
    dest: DIST_PATH
  },

  // index.html config
  index: {
    src: './src/index.html',
    dest: DIST_PATH
  },

  // static assets config
  assets: {
    src: './assets/**/*',
    dest: DIST_PATH + '/assets'
  },

  // vendor main files defined in bower.json of dependencies
  vendor: {
    watch: 'bower.json',
    dest: DIST_PATH + '/lib'
  },

  // html templates config
  templates: {
    src: './src/**/*.html',
    dest: DIST_PATH,
    bundle: 'templates.js',
    moduleName: 'ionicQuickstartTemplates',
    newModule: true
  },

  // Javascript logic config
  logic: {
    src: './src/**/*.js',
    dest: DIST_PATH,
    bundle: 'app.js'
  },

  // Style, sass config
  style: {
    src: './src/main.scss',
    watch: './src/**/*.scss',
    dest: DIST_PATH,
    bundle: 'app.css'
  },

  // Paths for dependencies
  dependencyPaths: [
    './bower_components',
    './node_modules'
  ],

  // Paths for ionic generated resources
  ionicPaths: [
    './hooks',
    './platforms',
    './plugins'
  ]
};

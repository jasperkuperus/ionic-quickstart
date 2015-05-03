# ionic-quickstart
A quickstart project for ionic, using gulp, making life just that bit easier.

## Getting started
1. Install npm modules: `npm install`
2. Compile and start serving: `gulp serve` or `gulp emulate`
3. See your app running at `http://localhost:8100`

## Usage
For basic usage and explanation, just run `gulp help`:

```
Usage
  gulp [task]

Available tasks
  assets         Copy assets to compile dir
  bower-install  Run bower install
  clean          Clean the dist (./www) folder
  compile        Compile the whole app
  default        Alias for this help menu
  emulate        Start ionic emulator
  help           Display this help text.
  index          Copy index.html
  logic          Compile all JS logic
  serve          Start ionic webserver @:8100
  style          Compile all scss
  templates      Compile templates to Angular templateCache
  watch          Set gulp in watch mode
```

### Running your application
The two commands below make sure your application is always in sync. Source code is watched, compiled and changes are pushed to your browser or emulator using livereload.

* `gulp serve`
Compiles and serves your app (using the ionic CLI) on port `8100`

* `gulp emulate`
Similar to `gulp serve`, but starts the emulator to show your app. Your app is also still accessible on port `8100`.

### Compiling your application
Compilation of your app is broken down in several steps and tasks. Compilation is automatically done when using either `gulp serve` or `gulp emulate`.

* `gulp compile`
Composite task to perform all compilation tasks in the correct order

* `gulp bower`
Performs a bower install

* `gulp index`
Copies the `index.html` in `src` one on one to `www/index.html`, treated as a static asset

* `gulp assets`
Copies all static assets in `assets` to `www/assets` so you can refer to them in your app as `/assets/x.jpg`

* `gulp logic`
Compiles all javascript files in `src` to one concatenated file, `www/app.js`

* `gulp style`
Takes `src/main.scss` as entry point and compiles all imported scss to `www/app.css`

* `gulp templates`
Takes all `src/**/*.html` files, except `src/index.html` and puts them in an Angular `$templateCache` and creates a module in `www/templates.js`

#### Clean
* `gulp clean`
Cleans all compiled resources, effectively deleting the `./www` folder

#### Watch
All compilation tasks can be either run for once or run continuously by registering a watch task. To enable watch, use the `gulp watch` task, e.g.:

`gulp watch compile`
The watch command makes sure the gulp setup is set in watch mode. All following tasks register a watch. This also works for e.g. `gulp watch assets`.

## Application structure
The following application structure is assumed for this quickstart setup:

```
FIXME.
```
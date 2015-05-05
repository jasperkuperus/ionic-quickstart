# ionic-quickstart
A quickstart project for ionic, using gulp, making life just that bit easier.

## Getting started
1. Make sure to have gulp globally installed: `npm install -g gulp`
2. Install npm modules: `npm install`
3. Compile and start serving: `gulp serve` or `gulp emulate`
4. See your app running at `http://localhost:8100`

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

* `gulp vendor`
Copies all vendor (bower) main files to `www/lib`, preserving original folder structure.

* `gulp logic`
Compiles all javascript files in `src` to one concatenated file, `www/app.js`

* `gulp style`
Takes `src/main.scss` as entry point and compiles all imported scss to `www/app.css`

* `gulp templates`
Takes all `src/**/*.html` files, except `src/index.html` and puts them in an Angular `$templateCache` and creates a module in `www/templates.js`

#### Clean
* `gulp clean`
Cleans all compiled resources, effectively deleting the `www` folder

#### Watch
All compilation tasks can be either run for once or run continuously by registering a watch task. To enable watch, use the `gulp watch` task, e.g.:

`gulp watch compile`
The watch command makes sure the gulp setup is set in watch mode. All following tasks register a watch. This also works for e.g. `gulp watch assets`.

## Application structure
The following application structure is assumed for this quickstart setup:

```
- assets                   # Contains static assets that should be served as-is
  - x.jpg
- src                      # Contains the application source
  - app                    # Contains the app-level logic files (routes, config, run blocks, etc.)
    - routes.js
    - ...
  - module                 # Subfolder for each 'module'
    - _module.scss
    - module.html
    - module.controller.js
    - ...
  - misc                   # Contains miscellaneous things
    - some.filter.js
    ...
  - index.html             # The entry-point for your application
  - main.js                # Entry point javascript file, contains app/module definition
  - main.scss              # Entry point for sass, should import all partials
- www                      # The dist build
  - lib                    # Main files for installed bower components
- bower.json               # Bower file
- gulp-config.js           # Contains configuration for the gulp setup
- gulpfile.js              # Gulp file
- ionic.project            # Ionic project definition
```

### Customization
All paths used in the gulp setup are defined in the `gulp-config.js` file. Change the paths there if you want to change your app structure.

## Bower dependencies
Bower dependencies are copied to the `www/lib` folder, preserving folder structure. Only the files declared as `main` files in the dependency's `bower.json` are copied. For example, if you want to use lodash:

```
bower install --save lodash
```

The `vendor` task has copied the lodash files to `www/lib`, so you can now use them in your `index.html`:

```
 <script src="lib/lodash/lodash.js"></script>
```

### Overriding dependencies
In some scenarios, the correct files might not show up in your `www/lib` folder. Often, the reason for this is either a missing or incorrect `main` block in the dependency's `bower.json`. In that case, you can override their `main` block in your own `bower.json`:

```
{
  "name": "ionic-quickstart",
  ...
  "dependencies": {
    ...
    "my-incorrect-dep": "~x.y.z"
  },
  "overrides": {
    "my-incorrect-dep": {
      "main": [
        "js/my-incorrect-dep.js"
      ]
    }
  }
}
```
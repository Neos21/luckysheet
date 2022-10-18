const { src, dest, series, parallel, watch } = require('gulp');  // gulp core function
const uglify      = require('gulp-uglify');            // gulp compress js
const gulpif      = require('gulp-if');                // gulp judgment
const cleanCSS    = require('gulp-clean-css');         // gulp compress css
const concat      = require('gulp-concat');            // File merge
const del         = require('delete');                 // Delete Files
const esbuild     = require('esbuild');                // Build
const browserSync = require('browser-sync').create();  // Refresh the browser in real time

/** 本番ビルドの場合は圧縮などする */
const isProduction = process.env.NODE_ENV === 'production';

/** UglifyJS Compression Configuration https://github.com/mishoo/UglifyJS#minify-options */
const uglifyOptions = {
  compress: {
    drop_console: true
  }
};

/** File Handler Paths */
const paths = {
  // static resources, contains index.html, fonts and images, and extension plugins dependency
  staticHtml         : ['src/*.html'],
  staticFonts        : ['src/fonts/**'],
  staticAssets       : ['src/assets/**'],
  staticImages       : ['src/plugins/images/*.png'],
  staticExpendPlugins: ['src/expendPlugins/**', '!src/expendPlugins/**/plugin.js'],
  staticCssImages    : ['src/css/**'          , '!src/css/*.css'],
  
  // static resources dest
  destStaticHtml         : ['dist'],
  destStaticFonts        : ['dist/fonts'],
  destStaticAssets       : ['dist/assets'],
  destStaticImages       : ['dist/plugins/images'],
  destStaticExpendPlugins: ['dist/expendPlugins'],
  destStaticCssImages    : ['dist/css'],
  
  // core es module
  core: ['src/**/*.js', 'src/expendPlugins/**/plugin.js', '!src/plugins/js/*.js'],
  
  // plugins src
  pluginsCss: ['src/plugins/css/*.css'],
  plugins   : ['src/plugins/*.css'],
  css       : ['src/css/*.css', 'node_modules/flatpickr/dist/themes/light.css'],
  pluginsJs : [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/uuid/dist/umd/uuid.min.js',
    'src/plugins/js/clipboard.min.js',
    'src/plugins/js/spectrum.min.js',
    'src/plugins/js/jquery-ui.min.js',
    'src/plugins/js/jquery.mousewheel.min.js',
    'src/plugins/js/html2canvas.min.js',
    'src/plugins/js/localforage.min.js',
    'src/plugins/js/lodash.min.js',
    'src/plugins/js/jstat.min.js',
    'src/plugins/js/crypto-api.min.js',
    'src/plugins/js/jquery.sPage.min.js'
  ],
  
  // plugins concat
  concatPluginsCss: 'pluginsCss.css',
  concatPlugins   : 'plugins.css',
  concatCss       : 'luckysheet.css',
  concatPluginsJs : 'plugin.js',
  
  // plugins dest
  destPluginsCss: ['dist/plugins/css'],
  destPlugins   : ['dist/plugins'],
  destCss       : ['dist/css'],
  destPluginsJs : ['dist/plugins/js'],
  
  // Package directory
  dist: 'dist'
};

// Clear the dist directory
function clean() {
  return del([paths.dist]);
}

// Static server
function serve(done) {
  browserSync.init({
    server: {
      baseDir: paths.dist
    },
    ghostMode: false  // 默认true，滚动和表单在任何设备上输入将被镜像到所有设备里，会影响本地的协同编辑消息，故关闭
  }, done);
}

// Monitoring file changes
function watcher(done) {
  watch(paths.core               , { delay: 500 }, series(core                   , reloadBrowser));
  // watch plugins and css
  watch(paths.pluginsCss         , { delay: 500 }, series(pluginsCss             , reloadBrowser));
  watch(paths.plugins            , { delay: 500 }, series(plugins                , reloadBrowser));
  watch(paths.css                , { delay: 500 }, series(css                    , reloadBrowser));
  watch(paths.pluginsJs          , { delay: 500 }, series(pluginsJs              , reloadBrowser));
  // watch static
  watch(paths.staticHtml         , { delay: 500 }, series(copyStaticHtml         , reloadBrowser));
  watch(paths.staticFonts        , { delay: 500 }, series(copyStaticFonts        , reloadBrowser));
  watch(paths.staticAssets       , { delay: 500 }, series(copyStaticAssets       , reloadBrowser));
  watch(paths.staticImages       , { delay: 500 }, series(copyStaticImages       , reloadBrowser));
  watch(paths.staticExpendPlugins, { delay: 500 }, series(copyStaticExpendPlugins, reloadBrowser));
  watch(paths.staticCssImages    , { delay: 500 }, series(copyStaticCssImages    , reloadBrowser));
  done();
}

// Refresh browser
function reloadBrowser(done) {
  browserSync.reload();
  done();
}

/** `The following tasks did not complete`・` Did you forget to signal async completion?` エラーが発生するため、一見不必要な `async`・`await` を書く */
async function core() {
  await esbuild.buildSync({
    format: 'iife',
    globalName: 'luckysheet',
    entryPoints: ['src/index.js'],
    bundle: true,
    minify: isProduction,
    target: ['es2015'],
    sourcemap: false,
    outfile: 'dist/luckysheet.umd.js'
  });
}

// According to the build tag in html, package js and css
function pluginsCss() {
  return src(paths.pluginsCss)
    .pipe(concat(paths.concatPluginsCss))
    .pipe(gulpif(isProduction, cleanCSS()))
    .pipe(dest(paths.destPluginsCss));
}

function plugins() {
  return src(paths.plugins)
    .pipe(concat(paths.concatPlugins))
    .pipe(gulpif(isProduction, cleanCSS()))
    .pipe(dest(paths.destPlugins));
}

function css() {
  return src(paths.css)
    .pipe(concat(paths.concatCss))
    .pipe(gulpif(isProduction, cleanCSS()))
    .pipe(dest(paths.destCss));
}

function pluginsJs() {
  return src(paths.pluginsJs)
    .pipe(concat(paths.concatPluginsJs))
    .pipe(gulpif(isProduction, uglify(uglifyOptions)))
    .pipe(dest(paths.destPluginsJs));
}

// Copy static resources
function copyStaticHtml()          { return src(paths.staticHtml         ).pipe(dest(paths.destStaticHtml         )); }
function copyStaticFonts()         { return src(paths.staticFonts        ).pipe(dest(paths.destStaticFonts        )); }
function copyStaticAssets()        { return src(paths.staticAssets       ).pipe(dest(paths.destStaticAssets       )); }
function copyStaticImages()        { return src(paths.staticImages       ).pipe(dest(paths.destStaticImages       )); }
function copyStaticExpendPlugins() { return src(paths.staticExpendPlugins).pipe(dest(paths.destStaticExpendPlugins)); }
function copyStaticCssImages()     { return src(paths.staticCssImages    ).pipe(dest(paths.destStaticCssImages    )); }

const dev   = series(clean, parallel(pluginsCss, plugins, css, pluginsJs, copyStaticHtml, copyStaticFonts, copyStaticAssets, copyStaticImages, copyStaticExpendPlugins, copyStaticCssImages, core), watcher, serve);
const build = series(clean, parallel(pluginsCss, plugins, css, pluginsJs, copyStaticHtml, copyStaticFonts, copyStaticAssets, copyStaticImages, copyStaticExpendPlugins, copyStaticCssImages, core));

exports.dev     = dev;
exports.build   = build;
exports.default = dev;

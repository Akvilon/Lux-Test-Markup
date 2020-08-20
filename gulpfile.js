
let build_folder = "dist";
let source_folder = "src"

let paths = {
    build: {
        html: build_folder + "/",
        css: build_folder + "/css/",
        js: build_folder + "/js/",
        img: build_folder + "/img/",
        fonts: build_folder + "/fonts/",
    },
    src: {
        html: source_folder + "/*.html",
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*",
        fonts: source_folder + "/fonts/*",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg, png, svg}",
    },
    clean: "./" + build_folder + "/"
}

let { src, dest } = require('gulp');
gulp = require('gulp');
browsersync = require('browser-sync').create();
del = require('del');
scss = require('gulp-sass');
autoprefixer = require('gulp-autoprefixer');
group_media = require('gulp-group-css-media-queries');
clean_css = require('gulp-clean-css');
rename = require('gulp-rename');
uglify = require('gulp-uglify-es').default;
imagemin = require('gulp-imagemin');

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + build_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(paths.src.html)
        .pipe(dest(paths.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(paths.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(group_media())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(paths.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(paths.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(paths.src.js)
        .pipe(dest(paths.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(paths.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(paths.src.img)
        .pipe(dest(paths.build.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false}],
                interplaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(paths.build.img))
        .pipe(browsersync.stream())
}

function watchFiles(params) {
    gulp.watch([paths.watch.html], html)
    gulp.watch([paths.watch.css], css)
    gulp.watch([paths.watch.js], js)
    gulp.watch([paths.watch.img], images)
}

function clean(params) {
 return del(paths.clean)
}

function fonts (params) {
    src(paths.src.fonts)
        .pipe(dest(paths.build.fonts))
    return src(paths.src.fonts)
        .pipe(dest(paths.build.fonts))
}

let build = gulp.series(clean, gulp.parallel(images, js, css, html, fonts))
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.fonts = fonts;
exports.html = html;
exports.css = css;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = watch
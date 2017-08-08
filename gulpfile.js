var gulp = require("gulp");
var concat = require("gulp-concat-util");
var minify = require("gulp-minify");
var sourcemaps = require("gulp-sourcemaps");
var jsdoc =  require("gulp-jsdoc3");
var mochaPhantomJS = require("gulp-mocha-phantomjs");
var jslint = require("gulp-jslint");

var fs = require("fs");
var pkgJson = JSON.parse(fs.readFileSync("./package.json"))

var getToday = function () {

    var date = new Date();

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

};

var jsFiles = gulp.src([

    "src/doc/file.js",
    "src/doc/external.jquery.js",

    "src/global/startsWith.js",
    "src/global/interpretString.js",
    "src/global/isElement.js",
    "src/global/getAttribute.js",
    "src/global/getAllPrefixed.js",
    "src/global/setAttribute.js",
    "src/global/toObject.js",
    "src/global/toWords.js",
    "src/global/unique.js",
    "src/global/normalise.js",

    "src/members/am_prefix.js",
    "src/members/normalizeAm.js",
    "src/members/amHooks.js",

    "src/instance/am.js",
    "src/instance/hasAm.js",
    "src/instance/addAm.js",
    "src/instance/removeAm.js"

]);

var processFiles = function (source, filename) {

    return (
        "// Source: " + filename.replace(__dirname, "") + "\n" +
        source
            .replace(/(["'])use strict\1;?\s*/g, "")
            .replace(/\/\*jslint\s[\w\s,]+\s\*\//, "")
            .replace(/\/\*global\s[\$\w\s,]+\s\*\//, "")
            .replace(/<%=\s*(\w+)\s*%>/g, function (ignore, k) {

                return typeof pkgJson[k] === "string"
                    ? pkgJson[k]
                    : k;

            })
    );

};

var concatHeader = (
    `/*! ${pkgJson.name} (${pkgJson.homepage}) - ` +
    `v${pkgJson.version} - ${pkgJson.license} license - ` +
    `${getToday()} */\n` +
    `(function ($) {\n` +
    `    "use strict";\n\n`
);

var concatFooter = "\n}(jQuery));";

gulp.task("concat:prod", function () {

    jsFiles
        .pipe(concat("jquery.amcss.js", {
            process: processFiles
        }))
        .pipe(concat.header(concatHeader))
        .pipe(concat.footer(concatFooter))
        .pipe(gulp.dest("./dist/"));

});

gulp.task("concat:test", function () {

    jsFiles
        .pipe(concat("jquery.amcss.js", {
            process: processFiles
        }))
        .pipe(concat.header(concatHeader))
        .pipe(concat.footer(concatFooter))
        .pipe(gulp.dest("./tmp/"));

});

gulp.task("concat:dev", function () {

    jsFiles
        .pipe(concat("jquery.amcss-open.js"))
        .pipe(gulp.dest("./tmp/"));

});

gulp.task("minify", function () {

// Sourcemaps are causing issues for some reason. Removed until I can figure
// that out.

    gulp.src("./dist/jquery.amcss.js")
        // .pipe(sourcemaps.init())
        .pipe(minify({
            ext: {
                min: ".min.js"
            },
            preserveComments: function (node, comment) {
                return comment.value.startsWith("!");
            }
        }))
        // .pipe(sourcemaps.write("./", {
        //     sourceMappingURL: function (file) {
        //         return file.relative + ".map";
        //     }
        // }))
        .pipe(gulp.dest("./dist/"));

});

gulp.task("doc", function (cb) {

    var config = require("./jsdocConfig.json");

    gulp.src("./dist/jquery.amcss.js")
        .pipe(jsdoc(config, cb));

});

gulp.task("test", function () {

    gulp.src("./tests/testrunner.html")
        .pipe(mochaPhantomJS({
            reporter: "spec",
            phantomjs: {
                useColors: true
            }
        }));

});

gulp.task("watch", function () {

    gulp.watch(["gulpfile.js", "./src/**/*.js"], ["concat:test", "concat:dev"]);
    gulp.watch(["./test/**/*.js"], ["concat:test", "test"]);

});

gulp.task("lint", function () {

    gulp.src("./src/**/*.js")
        .pipe(jslint({
            edition: "2016-07-13",
            browser: true
        }))
        .pipe(jslint.reporter("default"));

});

// Processes
gulp.task("dev", ["watch"]);
gulp.task("prod", ["lint", "concat:test", "test", "concat:prod", "minify"]);

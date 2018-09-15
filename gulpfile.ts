import * as gulp from "gulp";
import * as ts from "gulp-typescript";
import * as sourcemaps from "gulp-sourcemaps";
import * as del from "del";
import * as webpack from "gulp-webpack";
import { exec } from "child_process";

/**
 * Bundle library into a single file for consumption.
 */
gulp.task("bundle", ["build"], function () {
    return gulp.src("src/index.js")
        .pipe(webpack({
            output: {
                libraryTarget: "umd",
                filename: `index.js`,
            },
            target: 'node'
        }))
        .pipe(gulp.dest("./dist"))
});

/**
 * Build typescript.
 */
gulp.task("build:typescript", ["clean"], function () {
    const tsProject = ts.createProject("tsconfig.json", {
        typescript: require("typescript"),
        rootDir: "./src"
    });

    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject(ts.reporter.defaultReporter())).js
        .pipe(sourcemaps.write(".", {
            includeContent: false,
            sourceRoot: `${__dirname}\\`
        }))
        .pipe(gulp.dest("./src"));
});

/**
 * Build typings.
 */
gulp.task("build:typings", ["build:typescript"], function () {
    const tsProject = ts.createProject("dtsconfig.json", {
        typescript: require("typescript"),
        rootDir: "./typings"
    });

    return tsProject.src()
        .pipe(tsProject(ts.reporter.defaultReporter())).dts
        .pipe(gulp.dest("./typings"));
})

gulp.task("clean", function () {
    return del("./dist", { force: true });
});

// Should also add test

gulp.task("build", ["build:typings"]);
gulp.task("default", ["bundle"]);

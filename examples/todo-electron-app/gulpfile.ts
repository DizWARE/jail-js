import * as gulp from "gulp";
import * as sass from "gulp-sass";
import * as ts from "gulp-typescript";
import * as sourcemaps from "gulp-sourcemaps";

/**
 * Build typescript.
 */
gulp.task(`build:typescript`, function () {
    const tsProject = ts.createProject("tsconfig.json", {
        typescript: require("typescript"),
        rootDir: "./"
    });

    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject(ts.reporter.defaultReporter())).js
        .pipe(sourcemaps.write(".", {
            includeContent: false,
            sourceRoot: `${__dirname}\\`
        }))
        .pipe(gulp.dest(tsProject.config.compilerOptions.outDir || "./"));
});

/**
 * Build sass.
 */
gulp.task('build:sass', function () {
    return gulp.src('app/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app'));
});

/**
 * Watch sass.
 */
gulp.task('watch:sass', function () {
    gulp.watch('app/**/*.scss', ['sass']);
});

// Should also add test
gulp.task('build', ['build:typescript', 'build:sass']);
gulp.task('default', ['build']);
/* eslint-disable @typescript-eslint/ban-ts-comment */
import gulp from "gulp";
import babel from "gulp-babel";
import ts from "gulp-typescript";
import del from "del";
import uglify from "gulp-uglify";

const tsProject = ts.createProject("tsconfig.json");

gulp.task("build:compile", async () => {
    return gulp
        .src("src/**/*.ts")
        .pipe(
            babel({
                presets: ["@babel/env", "@babel/typescript"],
                plugins: [
                    // @ts-ignore
                    ["@babel/plugin-proposal-decorators", { legacy: true }],
                    // @ts-ignore
                    ["@babel/plugin-proposal-class-properties"],
                ],
            })
        )
        .pipe(uglify())
        .pipe(gulp.dest("dist"));
});

gulp.task("build:types", async () => {
    return gulp.src("src/**/*.ts").pipe(tsProject());
});

gulp.task("clean", async () => {
    await del("dist/**");
});

gulp.task("watch", async () => {
    gulp.watch("src/**/*.ts", gulp.series("build:compile"));
});

gulp.task("default", gulp.series("clean", "build:compile"));

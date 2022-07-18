import gulp from "gulp";
import babel from "gulp-babel";
import ts from "gulp-typescript";
import del from "del";
import uglify from "gulp-uglify";

const tsProject = ts.createProject("tsconfig.json");

gulp.task("build:compile-ts", async () => {
    return gulp
        .src("src/**/*.ts")
        .pipe(
            babel({
                plugins: [
                    //"@babel/plugin-proposal-decorators",
                    //"@babel/proposal-class-properties",
                    //"@babel/proposal-object-rest-spread",
                    //"transform-decorators-legacy",
                    //"transform-class-properties",
                    // @ts-ignore
                    [
                        "@babel/plugin-proposal-decorators",
                        {
                            legacy: true,
                        },
                    ],
                    "@babel/plugin-proposal-class-properties",
                ],
                presets: ["@babel/preset-env", "@babel/preset-typescript"],
            })
        )
        .pipe(uglify())
        .pipe(gulp.dest("dist"));
});

gulp.task("build:type-check", async () => {
    return gulp.src("src/**/*.ts").pipe(tsProject());
});

gulp.task("clean:remove-dist", async () => {
    await del("dist/**");
});

gulp.task("watch", async () => {
    gulp.watch("src/**/*.ts", gulp.series("build:compile-ts"));
});

gulp.task(
    "default",
    gulp.series("build:type-check", "clean:remove-dist", "build:compile-ts")
);

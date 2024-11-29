const { src, dest } = require("gulp");
const newer = require("gulp-newer");

exports.default = async function () {
    src("./src/assets/**/*.svg", { encoding: false }, { base: "./src/assets" }).pipe(newer('wwwroot/assets/')).pipe(dest("wwwroot/assets/"));
    src("./src/assets/**/*.png", { encoding: false }, { base: "./src/assets" }).pipe(newer('wwwroot/assets/')).pipe(dest("wwwroot/assets/"));
    src("./src/assets/**/*.jpg", { encoding: false }, { base: "./src/assets" }).pipe(newer('wwwroot/assets/')).pipe(dest("wwwroot/assets/"));


    src([
        "./src/**/*.html",
        "./src/**/*.css",
        "./src/**/*.txt"        
    ],
        { base: "./src" }).pipe(dest("wwwroot/"));

    src([
        "./src/**/*.ts",
        "./src/**/*tsx"],


        { base: "./src" }).pipe(dest("wwwroot/src/"));
};
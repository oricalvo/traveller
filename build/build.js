'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var open = require('open');
var intercept = require('gulp-intercept');
var gutil = require('gulp-util');
var helpers = require("./helpers");
const buildPromise = require("./buildPromise");

function dev() {
    return Promise.resolve()
        .then(restorePackages)
        .then(compileTS)
        .then(compileSASS)
        .then(runWebServer(false))
        .then(helpers.delay(1000))
        .then(runBrowser);
}

function restorePackages() {
    return helpers.shellExec("npm install");
}

function compileTS() {
    return helpers.shellExec("node node_modules/typescript/lib/tsc.js");
}

function compileSASS() {
    return buildPromise(gulp.src(['./app/**/*.scss', "./styles/*.scss"]))
        .pipe(intercept(function(file) {
            gutil.log("    " + file.path);

            return file;
        }))
        .pipe(sass({omitSourceMapUrl: true}))
        .pipe(helpers.renameAndSave("css"))
        .get();
}

function runWebServer() {
    helpers.shellExec("node node_modules/nodemon/bin/nodemon.js server/app.js", {
        openNewCommandWindow: true
    });

    return Promise.resolve();
}

function runBrowser() {
    open('http://localhost:8001/index.html');

    return Promise.resolve();
}

module.exports = {
    dev: dev,
    server: runWebServer
};

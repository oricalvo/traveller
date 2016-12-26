/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            'npm:': 'node_modules/'
        },

        map: {
            app: 'app',
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            "text": "npm:systemjs-plugin-text/text.js",
            "css": "npm:systemjs-plugin-css/css.js",
            "json": "npm:systemjs-plugin-json/json.js",
            "reflect-metadata": "npm:reflect-metadata/Reflect.js",
            "zone.js": "npm:zone.js/dist/zone.js",
            "redux": "npm:redux/dist/redux.js",
            "lodash": "npm:lodash/lodash.js",
            '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
            'hammerjs': 'npm:hammerjs/hammer.js'
        },

        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }
        },

        meta: {
            "*.html": {
                loader: "text",
            },
            "*.css": {
                loader: "text",
            },
            "*.json": {
                loader: "json",
            },
        }
    });
})(this);


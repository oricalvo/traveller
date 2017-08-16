import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
require("node_modules/bootstrap/dist/css/bootstrap.css!css");
require("node_modules/bootstrap/dist/css/bootstrap-theme.css!css");

@Component({
    selector: 'my-app',
    template: require("./app.component.html"),
    styles: [require("./app.component.css")],
})
export class AppComponent { }

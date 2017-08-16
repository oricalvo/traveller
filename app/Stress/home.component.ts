import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';

@Component({
    selector: 'stresses-home',
    template: require("./home.component.html"),
    styles: [require("./home.component.css")],
})
export class StressHomeComponent {

}

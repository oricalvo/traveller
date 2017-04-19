import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';

@Component({
    selector: 'bins-home',
    template: require("./home.component.html"),
    styles: [require("./home.component.css")],
})
export class BinHomeComponent {

}

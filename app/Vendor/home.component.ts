import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';

@Component({
    selector: 'vendors-home',
    template: require("./home.component.html"),
    styles: [require("./home.component.css")],
})
export class VendorHomeComponent {

}

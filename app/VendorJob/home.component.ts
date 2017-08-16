import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';

@Component({
    selector: 'vendorjobs-home',
    template: require("./home.component.html"),
    styles: [require("./home.component.css")],
})
export class VendorjobsHomeComponent {

}

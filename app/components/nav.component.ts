/**
 * Created by nirz on 11/3/2016.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'Nav',
    template: require("./nav.component.html!text"),
    styles: [require("./nav.component.scss!text")]
})
export class NavComp {
    links = ['P1', 'P2', 'P3'];
}
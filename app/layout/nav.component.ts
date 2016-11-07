import { Component } from '@angular/core';

@Component({
    selector: 'nav',
    template: require("./nav.component.html"),
    styles: [require("./nav.component.css")]
})
export class NavComponent {
    links = ['P1', 'P2', 'P3'];
}
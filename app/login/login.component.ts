import {Component} from "@angular/core";

@Component({
    selector: 'login',
    template: require("./login.component.html"),
    styles: [require("./login.component.css")]
})
export class LoginComponent {
    links = ['P1', 'P2', 'P3'];
}
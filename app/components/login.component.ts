/**
 * Created by nirz on 11/3/2016.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';

const styles   = require("./login.component.scss!text");
const template = require("./login.component.html!text");

@Component({
    selector: 'login',
    template: template,
    styles: [ styles ]
})
export class Login {
    constructor(public router: Router, public http: Http) {
    }

    login(event, username, password) {
        event.preventDefault();
        let body = JSON.stringify({ username, password });
        this.http.post('http://localhost:3001/sessions/create', body, { headers: contentHeaders })
            .subscribe(
                response => {
                    localStorage.setItem('id_token', response.json().id_token);
                    this.router.navigate(['home']);
                },
                error => {
                    alert(error.text());
                    console.log(error.text());
                }
            );
    }

    signup(event) {
        event.preventDefault();
        this.router.navigate(['signup']);
    }
}
import {Component} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {AppStore} from "../services/appStore";
import {UserState} from "../reducers/AppState";

@Component({
    selector: 'login-status',
    template: require("./loginStatus.component.html"),
    styles: [require("./loginStatus.component.css")]
})
export class LoginStatusComponent {
    constructor(private appStore: AppStore,
                private authService: AuthService) {
    }

    get state(): UserState {
        return this.appStore.state.user;
    }

    get isLoggedIn() {
        return !!this.state.userName;
    }

    get userName() {
        return this.state.userName;
    }

    login() {
        this.authService.login("ori", "123");
    }

    logout() {
        this.authService.logout();
    }
}
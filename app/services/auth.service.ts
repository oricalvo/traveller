import {Inject, Injectable} from "@angular/core";
import {ILoginWebApi} from "../webApis/login.webapi";
import {AppStore} from "./appStore";
import {actions as userActions} from "../reducers/user";

@Injectable()
export class AuthService {
    constructor(@Inject("loginWebApi") private loginWebApi: ILoginWebApi,
                private appStore: AppStore) {
    }

    login(userName: string, password: string) {
        this.appStore.dispatch(userActions.loginBegin(userName));

        this.loginWebApi.login(userName, password).then(res=> {
            this.appStore.dispatch(userActions.loginCompleted(res.userName, res.role));
        }).catch(err => {
            this.appStore.dispatch(userActions.loginFailed(err));
        });
    }

    logout() {
        this.loginWebApi.logout().then(()=> {
            this.appStore.dispatch(userActions.loggedOut());
        });
    }
}

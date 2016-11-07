import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {AppComponent}   from './layout/app.component';
import {HeaderComponent} from './layout/header.component';
import {NavComponent} from './layout/nav.component';
import {MainComponent} from './layout/main.component';
import {FooterComponent} from './layout/footer.component';
import {AppStore} from "./services/appStore";
import {LoginStatusComponent} from "./login/loginStatus.component";
import {LoginWebApiMock} from "./mocks/login.webapi.mock";
import {AuthService} from "./services/auth.service";

const webApiMocks = [
    { provide: "loginWebApi", useClass: LoginWebApiMock }
];

@NgModule({
    imports: [BrowserModule],
    declarations: [
        AppComponent,
        HeaderComponent,
        NavComponent,
        MainComponent,
        FooterComponent,
        LoginStatusComponent,
    ],
    providers: [
        AppStore,
        AuthService,
        ...webApiMocks,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

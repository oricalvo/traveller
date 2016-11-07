import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }   from './components/app.component';
import { HeadComp } from './components/header.component';
import { NavComp } from './components/nav.component';
import { MainComp } from './components/main.component';
import { FootComp } from './components/footer.component';




@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ AppComponent,HeadComp,NavComp,MainComp,FootComp],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

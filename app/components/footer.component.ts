/**
 * Created by nirz on 11/3/2016.
 */
import { Component } from '@angular/core';
//import {ChangeColorDirective} from './change-color.directive'

@Component({
    selector: 'Footer',
    template: require("./footer.component.html!text"),
    styles: [require("./footer.component.scss!text")]
    //directives: [ChangeColorDirective]

})
export class FootComp {
}
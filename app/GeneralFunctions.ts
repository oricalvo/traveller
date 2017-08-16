/**
 * Created by eilamc on 8/15/2017.
 */


/*
this function is a polyfill to support older browsers with Object.assign like IE11
to use this need to :
add import : import {ObjectAssignPolyfillforOlderBrowsers} from "../GeneralFunctions"
add function call before Object.assign : ObjectAssignPolyfillforOlderBrowsers();
 in every class that uses Object.assign
 */

export function ObjectAssignPolyfillforOlderBrowsers():void{
    if (typeof Object.assign != 'function') {
        Object.assign = function(target) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        };
    }

}

/**
 * Created by eilamc on 2/5/2017.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {TravelerConfig} from "../Reducer/AppState";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs/Observable"
import {Injectable} from "@angular/core";
export interface ITravelerConfigWebApi {
    getTravelerConfig(): Promise<TravelerConfig>;

}
@Injectable()
export class TravelerConfigWebApi implements ITravelerConfigWebApi {
    constructor(private http: Http) {

    }

    getTravelerConfig(): Promise<TravelerConfig> {
        return this.http.get("/api/TravelerConfig/").map(res => res.json()).toPromise();

    }


}

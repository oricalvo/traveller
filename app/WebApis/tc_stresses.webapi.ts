/**
 * Created by eilamc on 2/5/2017.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {TC_Stress} from "../Reducer/AppState";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs/Observable"
import {Injectable} from "@angular/core";
export interface ITC_StressWebApi {
    getTC_Stresses(): Promise<TC_Stress[]>;
    saveTC_Stress(TC_Stress:TC_Stress): Promise<TC_Stress>;
    updateTC_Stress(TC_Stress:TC_Stress): Promise<TC_Stress>;
}
@Injectable()
export class TC_StressesWebApi implements ITC_StressWebApi {
    constructor(private http: Http) {

    }

    getTC_Stresses(): Promise<TC_Stress[]> {
        return this.http.get("/api/TC_Stress/").map(res => res.json()).toPromise();

    }
    saveTC_Stress(TC_Stress:TC_Stress): Promise<TC_Stress>{
        return this.http.post("/api/TC_Stress/Save/",TC_Stress).map(res => res.json()).toPromise();
    }
    updateTC_Stress(TC_Stress:TC_Stress): Promise<TC_Stress>{
        return this.http.post("/api/TC_Stress/Update/",TC_Stress).map(res => res.json()).toPromise();
    }

}

/**
 * Created by eilamc on 2/5/2017.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Stress} from "../Reducer/AppState";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs/Observable"
import {Injectable} from "@angular/core";
export interface IStressWebApi {
    getStresses(): Promise<Stress[]>;
    saveStress(Stress:Stress): Promise<Stress>;
    updateStress(Stress:Stress): Promise<Stress>;
}
@Injectable()
export class StressesWebApi implements IStressWebApi {
    constructor(private http: Http) {

    }

    getStresses(): Promise<Stress[]> {
        return this.http.get("/api/Stress/").map(res => res.json()).toPromise();

    }
    saveStress(Stress:Stress): Promise<Stress>{
        return this.http.post("/api/Stress/Save/",Stress).map(res => res.json()).toPromise();
    }
    updateStress(Stress:Stress): Promise<Stress>{
        return this.http.post("/api/Stress/Update/",Stress).map(res => res.json()).toPromise();
    }

}

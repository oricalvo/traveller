/**
 * Created by eilamc on 12/21/2016.
 */
import {StressTest} from "../reducers/AppState";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs/Observable"
import {Injectable} from "@angular/core";
export interface IStressTestsWebApi {
    getStressTests(): Promise<StressTest[]>;
    getStressTest(id: number): Promise<StressTest>;
}
@Injectable()
export class StressTestsWebApi implements IStressTestsWebApi {
    constructor(private http: Http) {

    }

    getStressTests(): Promise<StressTest[]> {
        return this.http.get("/api/stresstest/").map(res => res.json()).toPromise();

    }

    getStressTest(id: number): Promise<StressTest> {
        if(!id){
            throw new Error("Missing id parameter");
        }

        return this.http.get("/api/stresstest/" + id).map(res => res.json()).toPromise();
    }


}
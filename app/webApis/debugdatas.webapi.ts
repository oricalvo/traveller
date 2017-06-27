/**
 * Created by eilamc on 12/20/2016.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {DebugData} from "../reducers/AppState";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs/Observable"
import {Injectable} from "@angular/core";

export interface IDebugDataWebApi {
    getDebugDatas(): Promise<DebugData[]>;
    getDebugData(id: number): Promise<DebugData>;
   getDebugDataByDesc(desc: string): Promise<DebugData>;
}

@Injectable()
export class DebugDataWebApi implements IDebugDataWebApi {
    constructor(private http: Http) {

    }

    getDebugDatas(): Promise<DebugData[]> {
        return this.http.get("/api/debugdata/").map(res => res.json()).toPromise();

    }

    getDebugData(id: number): Promise<DebugData> {
        if(!id){
            throw new Error("Missing id parameter");
        }

        return this.http.get("/api/debugdata/GetById/" + id).map(res => res.json()).toPromise();
    }

    getDebugDataByDesc(desc: string): Promise<DebugData> {
        if(!desc){
            throw new Error("Missing id parameter");
        }

        return this.http.get("/api/debugdata/search/desc/" + desc).map(res => res.json()).toPromise();
    }
}


/**
 * Created by eilamc on 12/20/2016.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {DebugData} from "../reducers/AppState";

export interface IDebugDataWebApi {
    getDebugDatas(): Promise<DebugData[]>;
    getDebugData(path: string): Promise<DebugData>;
}
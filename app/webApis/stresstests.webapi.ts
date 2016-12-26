/**
 * Created by eilamc on 12/21/2016.
 */
import {StressTest} from "../reducers/AppState";
export interface IStressTestsWebApi {
    getStressTests(): Promise<StressTest[]>;
    getStressTest(box: string): Promise<StressTest>;
}
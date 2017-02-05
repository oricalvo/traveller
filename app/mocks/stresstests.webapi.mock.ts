/**
 * Created by eilamc on 12/21/2016.
 */
import {IStressTestsWebApi} from "../webApis/stresstests.webapi";
import {StressTest} from "../reducers/AppState";

const stresstests: StressTest[] = require("./stresstests.json");

export class StressTestsWebApiMock implements IStressTestsWebApi {
    getStressTests(): Promise<StressTest[]> {
        return Promise.resolve().then(() => {
            console.log(stresstests);
            return stresstests;
        });
    }

   getStressTest(id: number): Promise<StressTest> {
       return Promise.resolve().then(() => {
            const stresstest = stresstests.find(d => d.id == id);
            if (!stresstest) {
               throw new Error("Invalid stresstest id");
           }

           return stresstest;
        });
    }
}

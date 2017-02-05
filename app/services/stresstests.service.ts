/**
 * Created by eilamc on 12/19/2016.
 */
import {Inject, Injectable} from "@angular/core";
import {AppStore} from "./appStore";
import {actions} from "../reducers/stresstests";
import {IStressTestsWebApi} from "../webApis/stresstests.webapi";
import {StressTest} from "../reducers/AppState";

@Injectable()
export class StressTestService {
    constructor(@Inject("stresstestsWebApi") private stresstestsWebApi: IStressTestsWebApi,
                private appStore: AppStore) {
    }

    loadAll() {
        this.stresstestsWebApi.getStressTests().then(stresstests => {
            this.appStore.dispatch(actions.loadStressTests(stresstests));
        });
    }
    select(id: number) {
        this.stresstestsWebApi.getStressTest(id).then(stressTest => {
            this.appStore.dispatch(actions.selectStressTest(stressTest));
        });
    }
}
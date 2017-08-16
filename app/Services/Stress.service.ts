/**
 * Created by eilamc on 2/7/2017.
 */
import {Inject, Injectable} from "@angular/core";
import {AppStore} from "./appStore";
import {actions} from "../Reducer/Stress";
import {actions as TravelerTestProgramActions} from "../Reducer/TestProgramTraveler";
import {IStressWebApi} from "../WebApis/stresses.webapi";
import {Stress} from "../Reducer/AppState";

@Injectable()
export class StressesService {
    constructor(@Inject("stressesWebApi") private stressesWebApi: IStressWebApi,
                private appStore: AppStore) {
    }

    loadAll() {
        this.stressesWebApi.getStresses().then(stresses => {
            this.appStore.dispatch(actions.loadStresses(stresses));
        });
    }

    update(Stress:Stress){
        this.stressesWebApi.updateStress(Stress).then(Stress => {
            this.appStore.dispatch(actions.selectStress(Stress));

        });
    }
    save(Stress:Stress) {
        this.stressesWebApi.saveStress(Stress).then(Stress => {
            this.appStore.dispatch(actions.selectStress(Stress));
            this.appStore.state.stresses.data.push(Stress);
        });
    }


}
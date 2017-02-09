import {createStore, Store, Unsubscribe, Action} from "redux";
import {AppState} from "../reducers/AppState";
import {DeviceSortBy} from "../reducers/AppState";
import {combineReducers} from "redux";
import {reducer as userReduce} from "../reducers/user";
import {reducer as devicesReduce, initialState as devicesInitialState} from "../reducers/devices";
import {reducer as imagesReduce, initialState as imagesInitialState} from "../reducers/images";

import {reducer as DebugDataReducer, initialState as DebugDatasInitialState} from "../reducers/debugdatas";

import {reducer as StressTestsReduce, initialState as StressTestsInitialState} from "../reducers/stresstests";
import {reducer as VendorsReduce, initialState as VendorInitialState} from "../reducers/vendors";
import {reducer as VendorsjobsReduce, initialState as VendorjobInitialState} from "../reducers/vendorjobs";
import {reducer as FabricatorsReduce, initialState as FabricatorInitialState} from "../reducers/fabricators";
import {reducer as TechnologysReduce, initialState as TechnologyInitialState} from "../reducers/technologys";
import {reducer as PackgessReduce, initialState as PackageInitialState} from "../reducers/packages";


export class AppStore {
    store: Store<AppState>;

    constructor() {
        const initialState: AppState = {
            user: {
                userName: null,
                role: null,
                logging: false,
            },
            devices: devicesInitialState,
            images:imagesInitialState,
            debugData:DebugDatasInitialState,
            stresstests:StressTestsInitialState,
            vendors:VendorInitialState,
            vendorjobs:VendorjobInitialState,
            fabricators:FabricatorInitialState,
            technologys:TechnologyInitialState,
            packages:PackageInitialState

        };

        const root = combineReducers<AppState>({
            user: userReduce,
            devices:devicesReduce,
            images:imagesReduce,
            debugData:DebugDataReducer,
            stresstests:StressTestsReduce,
            vendors:VendorsReduce,
            vendorjobs:VendorsjobsReduce,
            fabricators:FabricatorsReduce,
            technologys:TechnologysReduce,
            packages:PackgessReduce
        });

        this.store = createStore(root, initialState);
    }

    subscribe(listener: () => void): Unsubscribe {
        return this.store.subscribe(listener);
    }

    dispatch<A extends Action>(action: A): A {
        return this.store.dispatch(action);
    }

    get state(): AppState {
        return this.store.getState();
    }
}

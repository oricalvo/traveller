import {createStore, Store, Unsubscribe, Action} from "redux";
import {AppState} from "../reducers/AppState";
import {DeviceSortBy} from "../reducers/AppState";
import {combineReducers} from "redux";
import {reducer as userReduce} from "../reducers/user";
import {reducer as devicesReduce, initialState as devicesInitialState} from "../reducers/devices";
import {reducer as imagesReduce, initialState as imagesInitialState} from "../reducers/images";

import {reducer as DebugDatasReduce, initialState as DebugDatasInitialState} from "../reducers/debugdatas";

import {reducer as StressTestsReduce, initialState as StressTestsInitialState} from "../reducers/stresstests";


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
            debugdatas:DebugDatasInitialState,
            stresstests:StressTestsInitialState
        };

        const root = combineReducers<AppState>({
            user: userReduce,
            devices:devicesReduce,
            images:imagesReduce,
            debugdatas:DebugDatasReduce,
            stresstests:StressTestsReduce
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

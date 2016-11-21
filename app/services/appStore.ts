import {createStore, Store, Unsubscribe, Action} from "redux";
import {AppState} from "../reducers/AppState";
import {DeviceSortBy} from "../reducers/AppState";
import {combineReducers} from "redux";
import {reducer as userReduce} from "../reducers/user";
import {reducer as devicesReduce, initialState as devicesInitialState} from "../reducers/devices";

export class AppStore {
    store: Store<AppState>;

    constructor() {
        const initialState: AppState = {
            user: {
                userName: null,
                role: null,
                logging: false,
            },
            devices: devicesInitialState
        };

        const root = combineReducers<AppState>({
            user: userReduce,
            devices:devicesReduce
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

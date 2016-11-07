import {createStore, Store, Unsubscribe, Action} from "redux";
import {root} from "../reducers/root";
import {AppState} from "../reducers/AppState";
import {Injectable} from "@angular/core";

export class AppStore {
    store: Store<AppState>;

    constructor() {
        const initialState: AppState = {
            user: {
                userName: null,
                role: null,
                logging: false,
            }
        };

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

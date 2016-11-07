import {AppState} from "./AppState";
import {Action, combineReducers} from  "redux";
import {reducer as userReducer} from "./user";

export const root = combineReducers<AppState>({
    user: userReducer
});

// export function root(state: AppState, action: Action): AppState {
//     return state;
// }

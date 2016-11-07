import Action = Redux.Action;
import {UserState} from "./AppState";

export const actionTypes = {
    LOGIN_BEGIN: "LOGIN_BEGIN",
    LOGIN_COMPLETED: "LOGIN_COMPLETED",
    LOGIN_FAILED: "LOGIN_FAILED",
    LOGGED_OUT: "LOGGED_OUT",
};

export const actions = {
    loginBegin: function loginBegin(userName: string) {
        return {
            type: actionTypes.LOGIN_BEGIN,
            userName: userName,
        }
    },
    loginCompleted: function loginEnd(userName: string, role: string) {
        return {
            type: actionTypes.LOGIN_COMPLETED,
            userName: userName,
            role: role,
        }
    },
    loginFailed: function loginFailed(err: Error) {
        return {
            type: actionTypes.LOGIN_FAILED,
            error: err,
        }
    },
    loggedOut: function loggedOut() {
        return {
            type: actionTypes.LOGGED_OUT,
        }
    },
};

function loginBegin(state: UserState): UserState {
    return Object.assign({}, state, {
        logging: true,
    });
}

function loginCompleted(state: UserState, userName: string, role: string): UserState {
    return Object.assign({}, state, {
        userName: userName,
        role: role,
        logging: false,
    });
}

function loginFailed(state: UserState): UserState {
    return Object.assign({}, state, {
        logging: false,
    });
}

function loggedOut(state: UserState): UserState {
    return Object.assign({}, state, {
        userName: null,
        role: null,
    } as UserState);
}

export function reducer(state: UserState, action: any): UserState {
    if(state===undefined) {
        return {
            userName: null,
            role: null,
            logging: false,
        };
    }

    if(action.type == actionTypes.LOGIN_BEGIN) {
        return loginBegin(state);
    }
    else if(action.type == actionTypes.LOGIN_COMPLETED) {
        return loginCompleted(state, action.userName, action.role);
    }
    else if(action.type == actionTypes.LOGIN_FAILED) {
        return loginFailed(state);
    }
    else if(action.type == actionTypes.LOGGED_OUT) {
        return loggedOut(state);
    }

    return state;
}

"use strict";
exports.actionTypes = {
    LOGIN_BEGIN: "LOGIN_BEGIN",
    LOGIN_COMPLETED: "LOGIN_COMPLETED",
    LOGIN_FAILED: "LOGIN_FAILED",
    LOGGED_OUT: "LOGGED_OUT",
};
exports.actions = {
    loginBegin: function loginBegin(userName) {
        return {
            type: exports.actionTypes.LOGIN_BEGIN,
            userName: userName,
        };
    },
    loginCompleted: function loginEnd(userName, role) {
        return {
            type: exports.actionTypes.LOGIN_COMPLETED,
            userName: userName,
            role: role,
        };
    },
    loginFailed: function loginFailed(err) {
        return {
            type: exports.actionTypes.LOGIN_FAILED,
            error: err,
        };
    },
    loggedOut: function loggedOut() {
        return {
            type: exports.actionTypes.LOGGED_OUT,
        };
    },
};
function loginBegin(state) {
    return Object.assign({}, state, {
        logging: true,
    });
}
function loginCompleted(state, userName, role) {
    return Object.assign({}, state, {
        userName: userName,
        role: role,
        logging: false,
    });
}
function loginFailed(state) {
    return Object.assign({}, state, {
        logging: false,
    });
}
function loggedOut(state) {
    return Object.assign({}, state, {
        userName: null,
        role: null,
    });
}
function reducer(state, action) {
    if (state === undefined) {
        return {
            userName: null,
            role: null,
            logging: false,
        };
    }
    if (action.type == exports.actionTypes.LOGIN_BEGIN) {
        return loginBegin(state);
    }
    else if (action.type == exports.actionTypes.LOGIN_COMPLETED) {
        return loginCompleted(state, action.userName, action.role);
    }
    else if (action.type == exports.actionTypes.LOGIN_FAILED) {
        return loginFailed(state);
    }
    else if (action.type == exports.actionTypes.LOGGED_OUT) {
        return loggedOut(state);
    }
    return state;
}
exports.reducer = reducer;
//# sourceMappingURL=user.js.map
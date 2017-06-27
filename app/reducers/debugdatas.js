"use strict";
/**
 * Created by eilamc on 12/20/2016.
 */
var _ = require("lodash");
var AppState_1 = require("./AppState");
exports.debugdataActionTypes = {
    LOAD_DEBUGDATAS: "LOAD_DEBUGDATAS",
};
exports.initialState = {
    data: null,
};
exports.actions = {
    loadDebugDatas: function (debugdatas) {
        return {
            type: exports.debugdataActionTypes.LOAD_DEBUGDATAS,
            debugdatas: debugdatas,
        };
    },
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (action.type == exports.debugdataActionTypes.LOAD_DEBUGDATAS) {
        return Object.assign({}, state, { data: action.debugdatas });
    }
    return state;
}
exports.reducer = reducer;
function loadDebugDatasData(state, action) {
    if (action.error) {
        return Object.assign({}, state, {
            isLoading: false,
            errorMessage: action.payload.message
        });
    }
    var dataSet = _.fromPairs(action.payload.map(function (Dd) { return [Dd.id, Dd]; }));
    return Object.assign({}, state, {
        isLoading: false,
        dataSet: dataSet,
        displayedItems: getDisplayedItems({
            dataSet: dataSet,
            sortBy: state.sortBy,
            isAscending: state.isAscending
        })
    });
}
function sortDebugDatasData(state, action) {
    return Object.assign({}, state, {
        sortBy: action.payload.sortBy,
        isAscending: action.payload.isAscending,
        displayedItems: getDisplayedItems({
            dataSet: state.dataSet,
            sortBy: action.payload.sortBy,
            isAscending: action.payload.isAscending
        })
    });
}
function getDisplayedItems(options) {
    var sortOperator;
    switch (options.sortBy) {
        case AppState_1.DebugDataSortBy.desc:
            sortOperator = function (v) { return v.desc; };
            break;
        default:
            sortOperator = function (v) { return v.desc.toLocaleLowerCase(); };
            break;
    }
    return _(_.values(options.dataSet))
        .orderBy([sortOperator], [options.isAscending ? 'asc' : 'desc'])
        .map(function (dd) { return dd.id; })
        .value();
}
//# sourceMappingURL=debugdatas.js.map
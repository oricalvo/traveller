"use strict";
/**
 * Created by eilamc on 12/21/2016.
 */
var _ = require("lodash");
var AppState_1 = require("./AppState");
exports.stresstestActionTypes = {
    LOAD_STRESSTEST: "LOAD_STRESSTEST",
    SELECT_STRESSTEST: "SELECT_STRESSTEST",
};
exports.initialState = {
    data: null,
    selected: null,
};
exports.actions = {
    loadStressTests: function (Stresstests) {
        return {
            type: exports.stresstestActionTypes.LOAD_STRESSTEST,
            Stresstests: Stresstests,
        };
    },
    selectStressTest: function (stressTest) {
        return {
            type: exports.stresstestActionTypes.SELECT_STRESSTEST,
            stressTest: stressTest,
        };
    },
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (action.type == exports.stresstestActionTypes.LOAD_STRESSTEST) {
        return Object.assign({}, state, { data: action.Stresstests });
    }
    else if (action.type == exports.stresstestActionTypes.SELECT_STRESSTEST) {
        return Object.assign({}, state, { selected: action.stressTest });
    }
    return state;
}
exports.reducer = reducer;
function sortStressTestsData(state, action) {
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
        case AppState_1.StressTestSortBy.qtyIn:
            sortOperator = function (v) { return v.qtyIn; };
            break;
        case AppState_1.StressTestSortBy.stressDuration:
            sortOperator = function (v) { return v.stressDuration; };
            break;
        case AppState_1.StressTestSortBy.stressCycleIn:
            sortOperator = function (v) { return v.stressCycleIn; };
            break;
        case AppState_1.StressTestSortBy.stressDateIn:
            sortOperator = function (v) { return v.stressDateIn; };
            break;
        case AppState_1.StressTestSortBy.stressDateOut:
            sortOperator = function (v) { return v.stressDateOut; };
            break;
        case AppState_1.StressTestSortBy.stressReject:
            sortOperator = function (v) { return v.stressReject; };
            break;
        case AppState_1.StressTestSortBy.stressQtyOut:
            sortOperator = function (v) { return v.stressQtyOut; };
            break;
        case AppState_1.StressTestSortBy.testQtyIn:
            sortOperator = function (v) { return v.testQtyIn; };
            break;
        case AppState_1.StressTestSortBy.testDuration:
            sortOperator = function (v) { return v.testDuration; };
            break;
        case AppState_1.StressTestSortBy.testDateIn:
            sortOperator = function (v) { return v.testDateIn; };
            break;
        case AppState_1.StressTestSortBy.testDateOut:
            sortOperator = function (v) { return v.testDateOut; };
            break;
        case AppState_1.StressTestSortBy.testRejects:
            sortOperator = function (v) { return v.testRejects; };
            break;
        case AppState_1.StressTestSortBy.testQtyOut:
            sortOperator = function (v) { return v.testQtyOut; };
            break;
        case AppState_1.StressTestSortBy.clips:
            sortOperator = function (v) { return v.clips; };
            break;
        case AppState_1.StressTestSortBy.reballingNumber:
            sortOperator = function (v) { return v.reballingNumber; };
            break;
        case AppState_1.StressTestSortBy.faNumber:
            sortOperator = function (v) { return v.faNumber; };
            break;
        case AppState_1.StressTestSortBy.box:
            sortOperator = function (v) { return v.box; };
            break;
        case AppState_1.StressTestSortBy.zone:
            sortOperator = function (v) { return v.zone; };
            break;
        case AppState_1.StressTestSortBy.faDiscription:
            sortOperator = function (v) { return v.faDiscription; };
            break;
        case AppState_1.StressTestSortBy.updatedByPersonId:
            sortOperator = function (v) { return v.updatedByPersonId; };
            break;
        case AppState_1.StressTestSortBy.comments:
            sortOperator = function (v) { return v.comments; };
            break;
        case AppState_1.StressTestSortBy.updateDate:
            sortOperator = function (v) { return v.updateDate; };
            break;
        default:
            sortOperator = function (v) { return v.updateDate.toLocaleLowerCase(); };
            break;
    }
    return _(_.values(options.dataSet))
        .orderBy([sortOperator], [options.isAscending ? 'asc' : 'desc'])
        .map(function (SS) { return SS.id; })
        .value();
}
//# sourceMappingURL=stresstests.js.map
/**
 * Created by eilamc on 12/19/2016.
 */
import * as _ from "lodash";
import Action = Redux.Action;
import {Http, Response} from "@angular/http";
import {ImagesState, image} from "./AppState";
import {ImageSortBy} from "./AppState";

export const imageActionTypes= {
    LOAD_IMAGES: "LOAD_IMAGES",

};

export const initialState = {
    data: null,
    // sortBy: DeviceSortBy.name,
    // isAscending: true,
    // isLoading: true,
    // displayedItems: null,
    // currentDeviceId: null
};

export const actions = {
    loadImages: function(images: image[]) {
        return {
            type: imageActionTypes.LOAD_IMAGES,
            images: images,
        }
    },

};
export function reducer(state: any = initialState, action: any): ImagesState {
    if(action.type == imageActionTypes.LOAD_IMAGES) {
        return Object.assign({}, state, {data: action.images});
    }

    return state;
}
function loadImageData(state, action) {

    if (action.error) {
        return Object.assign({}, state, {
            isLoading: false,
            errorMessage: action.payload.message
        })
    }

    let dataSet = _.fromPairs(action.payload.map(img => [img.id, img]))
    return Object.assign({}, state, {
        isLoading: false,
        dataSet,
        displayedItems: getDisplayedItems({
            dataSet,
            sortBy: state.sortBy,
            isAscending: state.isAscending

        })
    })
}
function sortImageData(state, action) {
    return Object.assign({}, state, {
        sortBy: action.payload.sortBy,
        isAscending: action.payload.isAscending,
        displayedItems: getDisplayedItems({
            dataSet: state.dataSet,
            sortBy: action.payload.sortBy,
            isAscending: action.payload.isAscending
        })
    })
}
function getDisplayedItems(options) {

    let sortOperator: any;
    switch (options.sortBy) {
        case ImageSortBy.path:
            sortOperator = (v: any) => v.path
            break

        default:
            sortOperator = (v: any) => v.path.toLocaleLowerCase()
            break
    }

    return _(_.values(options.dataSet))
        .orderBy([sortOperator], [options.isAscending ? 'asc' : 'desc'])
        .map((img: any) => img.id)
        .value()
}

// Constants
import actionTypeConstants from '../constants/actionTypeConstants';

// Services
import {locationService} from '../services';

//util
import * as fetchPolyfill from '../utils/fetchPolyfill';

export function requestLocation() {
    return {
        type: actionTypeConstants.REQUEST_LOCATION
    }
}

export function responseLocation() {
    return {
        type: actionTypeConstants.RESPONSE_LOCATION
    }
}

export function listLocation(locations) {
    return {
        type: actionTypeConstants.LIST_LOCATION,
        data: locations
    }
}

/**
 *  1. Dispatch a "Request" action to know the async call has started.
 *  2. Dipatch "List" action to list all the databases.
 *  3. Dispatch a "Response" action to know async call has ended.
 *
 * @returns {Function}
 */
export function fetchLocations() {
    return function (dispatch) {
        dispatch(requestLocation());
        return new Promise((resolve, reject)=>{
            return locationService.fetchAll()
                .then(fetchPolyfill.parseJSON)
                .then(fetchPolyfill.checkStatus)
                .then((body) => {
                    dispatch(listLocation(body.locations));
                    dispatch(responseLocation());
                    resolve(body);
                }).catch(error => {
                    dispatch(responseLocation());
                    reject(error);
                });
        })

    }
}

export function selectedLocation(location) {
    return {
        type: actionTypeConstants.SELECTED_LOCATION,
        data: location
    }
}

export function removeSelectedLocation(location) {
    return {
        type: actionTypeConstants.REMOVE_SELECTED_LOCATION
    }
}

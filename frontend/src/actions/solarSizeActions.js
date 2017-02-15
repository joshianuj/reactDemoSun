// Constants
import actionTypeConstants from '../constants/actionTypeConstants';

// Services
import {solarSizeService} from '../services';

//util
import * as fetchPolyfill from '../utils/fetchPolyfill';

export function requestSolarSize() {
    return {
        type: actionTypeConstants.REQUEST_SOLAR_SIZE
    }
}

export function responseSolarSize() {
    return {
        type: actionTypeConstants.RESPONSE_SOLAR_SIZE
    }
}

export function clearSolarSize() {
    return {
        type: actionTypeConstants.CLEAR_SOLAR_SIZE
    }
}

export function saveSolarSize(response) {
    return {
        type: actionTypeConstants.SAVE_SOLAR_SIZE,
        data: response
    }
}

/**
 *  1. Dispatch a "Request" action to know the async call has started.
 *  2. Dipatch "List" action to list all the databases.
 *  3. Dispatch a "Response" action to know async call has ended.
 *
 * @returns {Function}
 */
export function postDetails(payload) {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            dispatch(requestSolarSize());
            return solarSizeService.post(payload)
                .then(fetchPolyfill.parseJSON)
                .then(fetchPolyfill.checkStatus)
                .then((body) => {
                    dispatch(saveSolarSize(body));
                    dispatch(responseSolarSize());
                    resolve(body);
                }).catch((error)=> {
                    dispatch(responseSolarSize());
                    reject(error);
                });
        })

    }
}

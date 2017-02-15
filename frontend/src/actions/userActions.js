// Constants
import actionTypeConstants from '../constants/actionTypeConstants';

// Services
import {userService} from '../services';

//util
import * as fetchPolyfill from '../utils/fetchPolyfill';

export function requestUser() {
    return {
        type: actionTypeConstants.REQUEST_USER
    }
}

export function responseUser() {
    return {
        type: actionTypeConstants.RESPONSE_USER
    }
}

export function clearUserDetails() {
    return {
        type: actionTypeConstants.CLEAR_USER_DETAILS
    }
}

export function saveUserDetails(response) {
    return {
        type: actionTypeConstants.SAVE_USER_DETAILS,
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
        dispatch(requestUser());
        return new Promise((resolve, reject)=>{
            return userService.post(payload)
                .then(fetchPolyfill.parseJSON)
                .then(fetchPolyfill.checkStatus)
                .then((response) => {
                    dispatch(saveUserDetails(response.data));
                    dispatch(responseUser());
                    resolve(response);
                }).catch((error)=>{
                    dispatch(responseUser());
                    reject(error);
                });
        })

    }
}



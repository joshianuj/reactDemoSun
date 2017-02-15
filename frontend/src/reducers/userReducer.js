// Constants
import actionTypeConstants from '../constants/actionTypeConstants';

// Libraries
import Immutable from 'immutable';

let initialState = Immutable.Map({
    isFetching: false,
    result: {}
});

export default function solarSizeReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypeConstants.REQUEST_USER:
            return state.set('isFetching', true);

        case actionTypeConstants.RESPONSE_USER:
            return state.set('isFetching', false);

        case actionTypeConstants.CLEAR_USER_DETAILS:
            return state.set('user', {});

        case actionTypeConstants.SAVE_USER_DETAILS:
            return state.set('user', action.data);

        default:
            return state;
    }
}

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
        case actionTypeConstants.REQUEST_SOLAR_SIZE:
            return state.set('isFetching', true);

        case actionTypeConstants.RESPONSE_SOLAR_SIZE:
            return state.set('isFetching', false);

        case actionTypeConstants.CLEAR_SOLAR_SIZE:
            return state.set('result', {});

        case actionTypeConstants.SAVE_SOLAR_SIZE:
            return state.set('result', action.data);

        default:
            return state;
    }
}

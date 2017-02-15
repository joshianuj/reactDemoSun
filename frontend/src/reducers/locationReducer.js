// Constants
import actionTypeConstants from '../constants/actionTypeConstants';

// Libraries
import Immutable from 'immutable';

let initialState = Immutable.Map({
    isFetching: false,
    selectedLocation: '',
    locations: []
});

export default function locationReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypeConstants.REQUEST_LOCATION:
            return state.set('isFetching', true);

        case actionTypeConstants.RESPONSE_LOCATION:
            return state.set('isFetching', false);

        case actionTypeConstants.CLEAR_LOCATION:
            return state.set('locations', []);

        case actionTypeConstants.LIST_LOCATION:
            return state.set('locations', action.data);

        case actionTypeConstants.SELECTED_LOCATION:
            return state.set('selectedLocation', action.data);

        case actionTypeConstants.REMOVE_SELECTED_LOCATION:
            return state.set('selectedLocation', '');

        default:
            return state;
    }
}

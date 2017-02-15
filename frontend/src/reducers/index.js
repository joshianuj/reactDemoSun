import {
    combineReducers
} from 'redux';

// Reducers
import solarSizeReducer from './solarSizeReducer';
import locationReducer from './locationReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    solarSizeReducer,
    locationReducer,
    userReducer
});

export default rootReducer;

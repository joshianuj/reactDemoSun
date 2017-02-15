import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import rootReducer from '../reducers';

// Middlewares
import ReduxThunk from 'redux-thunk';

export default function configureStore() {
    return createStore(
        rootReducer,
        compose(
            applyMiddleware(ReduxThunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
}

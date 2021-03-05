import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import serverReducer from './serverReducer';
import usuarioReducer from './usuarioReducer'

const rootReducer = combineReducers({
    // usuario: usuarioReducer,
    server: serverReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function generateStore() {
    const store = createStore(rootReducer, process.env.NODE_ENV  === 'development' ?
        composeEnhancers(applyMiddleware(thunk)) : applyMiddleware(thunk))
    //const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store
}
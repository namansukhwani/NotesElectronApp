import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Notes} from './notes';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const StoreConfig=()=>{
    const store=createStore(
        combineReducers({
            notes:Notes,
        }),
        applyMiddleware(thunk,logger)
    );
    return store;
}
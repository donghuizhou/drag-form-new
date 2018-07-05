import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { updateStateReducer } from './reducer';

let store = createStore(updateStateReducer, applyMiddleware(thunk));

export default store;





import { reducer } from "./Messgaes/messagesReducer";
import redux from 'redux-thunk'
import { createStore, applyMiddleware,compose } from 'redux'

const composeEnhancers = process.env.NODE_ENV ==='develpment'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;

const store = createStore(reducer,composeEnhancers(applyMiddleware(redux)));

export default store;

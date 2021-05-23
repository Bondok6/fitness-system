import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { reducer } from "./store/Messgaes/messagesReducer";

axios.defaults.baseURL = "https://smartfitnessgym.herokuapp.com/api/v1";
if (localStorage.getItem("token"))
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
   

const compine = combineReducers({
  reducer,
});

const store = createStore(compine, composeEnhancers(applyMiddleware(thunk)));

// console.log = console.warn = console.error = () => {};

// Look ma, no error!
console.error('Something bad happened.');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

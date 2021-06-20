import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";

let currentStore = null;
const middlewares = [];

middlewares.push(thunk);

export const configureStore = (initialState = {}) => {
  currentStore = createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewares)
  );
  return currentStore;
};

export const getStore = () => currentStore;

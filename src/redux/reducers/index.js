import { combineReducers } from "redux";
import { cartsReducer } from "./carts.reducer";
import { queryReducer } from "./query.reducer";

export const reducers = combineReducers({
  cartsReducer,
  queryReducer,
});

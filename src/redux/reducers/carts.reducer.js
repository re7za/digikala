import { cartsConstants } from "../../constants/carts.constants.js";
import {
  cartsListPlusThisId,
  cartsListMinusThisId,
  cartsListWithoutThisId,
} from "../../helpers/reducer-utils";

const initialState = {
  cartsInfo: JSON.parse(localStorage.getItem("cartsInfo")) ?? [],
};

export const cartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartsConstants.ADD_PRODUCT_TO_CARTS:
      return Object.assign({}, state, {
        cartsInfo: cartsListPlusThisId(state, action.payload.id),
      });

    case cartsConstants.REDUCE_PRODUCT_FROM_CARTS:
      return Object.assign({}, state, {
        cartsInfo: cartsListMinusThisId(state, action.payload.id),
      });

    case cartsConstants.REMOVE_PRODUCT_FROM_CARTS:
      return Object.assign({}, state, {
        cartsInfo: cartsListWithoutThisId(state, action.payload.id),
      });

    case cartsConstants.REMOVE_ALL_CARTS:
      localStorage.removeItem("cartsInfo");
      return Object.assign({}, state, {
        cartsInfo: [],
      });

    default:
      return state;
  }
};

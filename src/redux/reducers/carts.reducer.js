import { cartsConstants } from "../../constants/carts.constants.js";

const initialState = {
  cartsIds: JSON.parse(localStorage.getItem("cartsIds")) ?? [],
};

export const cartsReducer = (state = initialState, action) => {
  let updatedList = [];
  switch (action.type) {
    case cartsConstants.ADD_PRODUCT_TO_CARTS:
      updatedList = state.cartsIds.includes(action.payload.data)
        ? state.cartsIds
        : [...state.cartsIds, action.payload.data];
      localStorage.setItem("cartsIds", JSON.stringify(updatedList));
      return Object.assign({}, state, {
        cartsIds: updatedList,
      });

    case cartsConstants.REMOVE_PRODUCT_FROM_CARTS:
      updatedList = state.cartsIds.filter((id) => id !== action.payload.data);
      localStorage.setItem("cartsIds", JSON.stringify(updatedList));
      return Object.assign({}, state, {
        cartsIds: updatedList,
      });

    case cartsConstants.REMOVE_ALL_CARTS:
      localStorage.removeItem("cartsIds");
      return Object.assign({}, state, {
        cartsIds: [],
      });

    default:
      return state;
  }
};

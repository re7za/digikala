import { cartsConstants } from "../../constants/carts.constants.js";

const initialState = {
  cartsIds: [],
};

export const cartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartsConstants.ADD_PRODUCT_TO_CARTS:
      return Object.assign({}, state, {
        cartsIds: !state.cartsIds.includes(action.payload.data)
          ? [...state.cartsIds, action.payload.data]
          : state.cartsIds,
      });
    case cartsConstants.REMOVE_PRODUCT_FROM_CARTS:
      return Object.assign({}, state, {
        cartsIds: state.cartsIds.filter((id) => id !== action.payload.data),
      });
    case cartsConstants.REMOVE_ALL_CARTS:
      return Object.assign({}, state, {
        cartsIds: [],
      });

    default:
      return state;
  }
};

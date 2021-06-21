import { cartsConstants } from "../../constants/carts.constants.js";

const initialState = {
  cartsInfo: JSON.parse(localStorage.getItem("cartsInfo")) ?? [],
};

const cartsListPlusThisId = (state, cartId) => {
  const item = state.cartsInfo.find(
    (cart) => Number(cart.id) === Number(cartId)
  );
  const updatedList = !!item
    ? [
        ...state.cartsInfo.filter(
          (cart) => Number(cart.id) !== Number(item.id)
        ),
        { id: item.id, quantity: item.quantity + 1 },
      ]
    : [...state.cartsInfo, { id: cartId, quantity: 1 }];

  localStorage.setItem("cartsInfo", JSON.stringify(updatedList));
  return updatedList;
};

const cartsListMinusThisId = (state, cartId) => {
  const item = state.cartsInfo.find(
    (cart) => Number(cart.id) === Number(cartId)
  );
  const updatedList = !!item
    ? item.quantity === 1
      ? [
          ...state.cartsInfo.filter(
            (cart) => Number(cart.id) !== Number(item.id)
          ),
        ]
      : [
          ...state.cartsInfo.filter(
            (cart) => Number(cart.id) !== Number(item.id)
          ),
          { id: item.id, quantity: item.quantity - 1 },
        ]
    : [...state.cartsInfo, { id: cartId, quantity: 1 }];

  localStorage.setItem("cartsInfo", JSON.stringify(updatedList));
  return updatedList;
};

export const cartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartsConstants.ADD_PRODUCT_TO_CARTS:
      return Object.assign({}, state, {
        cartsInfo: cartsListPlusThisId(state, action.payload.data),
      });

    case cartsConstants.REMOVE_PRODUCT_FROM_CARTS:
      return Object.assign({}, state, {
        cartsInfo: cartsListMinusThisId(state, action.payload.data),
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

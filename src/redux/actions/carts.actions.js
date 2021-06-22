import { cartsConstants } from "../../constants/carts.constants";

export const addProductToCarts = (productId) => {
  return (dispatch) =>
    dispatch({
      type: cartsConstants.ADD_PRODUCT_TO_CARTS,
      payload: {
        id: productId,
      },
    });
};

export const reduceProductFromCarts = (productId) => {
  return (dispatch) =>
    dispatch({
      type: cartsConstants.REDUCE_PRODUCT_FROM_CARTS,
      payload: {
        id: productId,
      },
    });
};

export const removeProductFromCarts = (productId) => {
  return (dispatch) =>
    dispatch({
      type: cartsConstants.REMOVE_PRODUCT_FROM_CARTS,
      payload: {
        id: productId,
      },
    });
};

export const removeAllCarts = () => {
  return (dispatch) =>
    dispatch({
      type: cartsConstants.REMOVE_ALL_CARTS,
    });
};

import { cartsConstants } from "../../constants/carts.constants";

export const addProductToCarts = (productId) => {
  return (dispatch) =>
    dispatch({
      type: cartsConstants.ADD_PRODUCT_TO_CARTS,
      payload: {
        data: productId,
      },
    });
};

export const removeProductFromCarts = (productId) => {
  return (dispatch) =>
    dispatch({
      type: cartsConstants.REMOVE_PRODUCT_FROM_CARTS,
      payload: {
        data: productId,
      },
    });
};

export const removeAllCarts = () => {
  return (dispatch) =>
    dispatch({
      type: cartsConstants.REMOVE_ALL_CARTS,
    });
};

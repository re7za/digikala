export const cartsListPlusThisId = (state, cartId) => {
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

export const cartsListMinusThisId = (state, cartId) => {
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

export const cartsListWithoutThisId = (state, cartId) => {
  const item = state.cartsInfo.find(
    (cart) => Number(cart.id) === Number(cartId)
  );
  const updatedList = !!item
    ? [...state.cartsInfo.filter((cart) => Number(cart.id) !== Number(item.id))]
    : state.cartsInfo;

  localStorage.setItem("cartsInfo", JSON.stringify(updatedList));
  return updatedList;
};

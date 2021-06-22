export const cartsListPlusThisId = (state, cartId) => {
  const carts = state.cartsInfo;
  const itemIndex = carts.findIndex((loopItem) => loopItem.id === cartId);
  const item = itemIndex !== -1 ? carts[itemIndex] : null;

  let updatedList = [];
  if (!!item) {
    carts.splice(itemIndex, 1, {
      id: item.id,
      quantity: item.quantity + 1,
    });
    updatedList = [...carts];
  } else {
    updatedList = [...state.cartsInfo, { id: cartId, quantity: 1 }];
  }

  localStorage.setItem("cartsInfo", JSON.stringify(updatedList));
  return updatedList;
};

export const cartsListMinusThisId = (state, cartId) => {
  const carts = state.cartsInfo;
  const itemIndex = carts.findIndex((loopItem) => loopItem.id === cartId);
  const item = itemIndex !== -1 ? carts[itemIndex] : null;

  let updatedList = [];
  if (!!item) {
    if (item.quantity === 1) {
      updatedList = carts.filter((cart) => Number(cart.id) !== Number(item.id));
    } else {
      carts.splice(itemIndex, 1, {
        id: item.id,
        quantity: item.quantity - 1,
      });
      updatedList = [...carts];
    }
  } else return carts;

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

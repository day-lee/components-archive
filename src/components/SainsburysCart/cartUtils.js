export const increaseCartItem = (currentItems, productId) => {
  const itemExists = currentItems.find((item) => item.productId === productId);
  if (!itemExists) {
    return [...currentItems, { productId, quantity: 1 }];
  } else {
    return currentItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
};

export const decreaseCartItem = (currentItems, productId) => {
  const itemExists = currentItems.find((item) => item.productId === productId);
  if (itemExists?.quantity === 1) {
    return currentItems.filter((item) => item.productId !== productId);
  } else {
    return currentItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
};

export const removeCartItem = (cartItems, productId) => {
  return cartItems.filter((item) => item.productId !== productId);
};

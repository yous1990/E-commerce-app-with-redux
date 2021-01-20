import { actionTypes } from "./cart.types";

const updateQuantity = p =>
  p.quantity ? { ...p, quantity: p.quantity + 1 } : { ...p, quantity: 2 };

const cartReducer =  (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      const productInCart = state.find(p => p.id === action.product.id);
      if (!productInCart) return [...state, action.product];
      return state.map(p => {
        if (p.id === action.product.id) {
          return updateQuantity(p);
        }
        return p;
      });
    case actionTypes.REMOVE_PRODUCT_FROM_CART:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
};

export default cartReducer;

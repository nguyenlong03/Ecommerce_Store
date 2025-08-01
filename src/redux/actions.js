import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, CLEAR_CART, LOGIN_SUCCESS, LOGOUT } from './reducers';

// Cart Action Creators
export const addToCart = (product, quantity = 1) => ({
  type: ADD_TO_CART,
  payload: { product, quantity }
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: { id }
});

export const updateCartQuantity = (id, quantity) => ({
  type: UPDATE_CART_QUANTITY,
  payload: { id, quantity }
});

export const clearCart = () => ({
  type: CLEAR_CART
});

// Auth Action Creators
export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token }
});

export const logout = () => ({
  type: LOGOUT
});
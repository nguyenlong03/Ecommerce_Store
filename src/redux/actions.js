import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, CLEAR_CART, LOGIN_SUCCESS, LOGOUT, LOAD_USER_CART } from './reducers';

// Cart Action Creators
export const addToCart = (productData) => {

  
  // Tách quantity ra khỏi product data
  const { quantity = 1, ...product } = productData;
  
  return {
    type: ADD_TO_CART,
    payload: { product, quantity }
  };
};

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
export const loginSuccess = (user, token) => {
  return (dispatch, getState) => {

    
    // First load user's cart from localStorage
    const userCartKey = `cart_${user.id}`;
    const userCart = localStorage.getItem(userCartKey);

    // Dispatch login action
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user, token }
    });
    
    // Then load cart data if exists
    if (userCart) {
      try {
        const parsedCart = JSON.parse(userCart);
      
        
        // Use setTimeout to ensure login action is processed first
        setTimeout(() => {
          dispatch(loadUserCart(parsedCart));
          
        }, 100);
      } catch (error) {
        console.error('Error loading user cart:', error);
      }
    } else {
      console.log('No existing cart found for user');
    }
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    const currentState = getState();
   
    
    // First logout (this will save current cart to localStorage)
    dispatch({
      type: LOGOUT
    });
    
    // Then clear cart in Redux state only
    dispatch(clearCart());
   
  };
};

export const loadUserCart = (cartData) => ({
  type: LOAD_USER_CART,
  payload: cartData
});
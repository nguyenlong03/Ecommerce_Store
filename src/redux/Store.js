import { createStore, combineReducers, applyMiddleware } from 'redux';
import { cartReducer, authReducer } from './reducers';

// Simple thunk middleware with action tracking
let currentAction = null;
const thunk = store => next => action => {
  currentAction = action;
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

// Load state from localStorage
const loadState = () => {
  try {
    // Load auth state first
    const authState = localStorage.getItem('authState');
    let parsedAuthState = {
      isAuthenticated: false,
      user: null,
      token: null
    };
    
    if (authState) {
      const parsed = JSON.parse(authState);
      parsedAuthState = {
        isAuthenticated: false,
        user: null,
        token: null,
        ...parsed
      };
    }
    
    // Load cart state based on current user
    let cartState = {
      items: [],
      totalItems: 0,
      totalPrice: 0
    };
    
    // If user is authenticated, try to load their cart
    if (parsedAuthState.isAuthenticated && parsedAuthState.user && parsedAuthState.user.id) {
      const userCartKey = `cart_${parsedAuthState.user.id}`;
      const userCart = localStorage.getItem(userCartKey);
      console.log(`Loading cart for user ${parsedAuthState.user.id}:`, userCart);
      if (userCart) {
        try {
          const parsedUserCart = JSON.parse(userCart);
          cartState = {
            items: [],
            totalItems: 0,
            totalPrice: 0,
            ...parsedUserCart
          };
          console.log('Loaded cart state:', cartState);
        } catch (error) {
          console.error('Error parsing user cart:', error);
        }
      }
    }
    
    // Ensure the state has the proper structure
    return {
      cart: cartState,
      auth: parsedAuthState
    };
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state, actionType = null) => {
  try {
    // Save auth state separately
    const authState = {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
      token: state.auth.token
    };
    localStorage.setItem('authState', JSON.stringify(authState));
    
    // Save cart state based on current user
    if (state.auth.isAuthenticated && state.auth.user && state.auth.user.id) {
      const userCartKey = `cart_${state.auth.user.id}`;
      
      // Always save cart state when there are changes
      const cartState = {
        items: state.cart.items,
        totalItems: state.cart.totalItems,
        totalPrice: state.cart.totalPrice
      };
      console.log(`Saving cart for user ${state.auth.user.id}:`, cartState);
      localStorage.setItem(userCartKey, JSON.stringify(cartState));
    }
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer
});

// Load persisted state
const persistedState = loadState();

// Create store with persisted state
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk)
);

// Subscribe to store changes and save to localStorage selectively
store.subscribe(() => {
  const state = store.getState();
  const actionType = currentAction ? currentAction.type : null;
  
  // Always save auth state, but be selective with cart state
  saveState({
    cart: state.cart,
    auth: state.auth
  }, actionType);
});

export default store;
import { createStore, combineReducers } from 'redux';
import { cartReducer, authReducer } from './reducers';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // Return undefined to use initial state
    }
    const parsedState = JSON.parse(serializedState);
    
    // Ensure the state has the proper structure
    return {
      cart: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        ...parsedState.cart
      },
      auth: {
        isAuthenticated: false,
        user: null,
        token: null,
        ...parsedState.auth
      }
    };
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
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
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    auth: store.getState().auth
  });
});

export default store;
import { createStore, combineReducers } from 'redux';
import { cartReducer, authReducer } from './reducers';

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer
});

// Create store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
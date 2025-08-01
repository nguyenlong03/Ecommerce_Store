// Cart Actions
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

// Auth Actions
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// Initial state
const initialCartState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0
};

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  token: null
};

// Helper function to calculate totals
const calculateTotals = (items) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  return { totalItems, totalPrice };
};

// Cart Reducer
export const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === product.id);
      
      let updatedItems;
      if (existingItem) {
        // Update quantity if item already exists
        updatedItems = state.cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        updatedItems = [...state.cartItems, { ...product, quantity }];
      }
      
      const totals = calculateTotals(updatedItems);
      return {
        ...state,
        cartItems: updatedItems,
        ...totals
      };
    }

    case REMOVE_FROM_CART: {
      const updatedItems = state.cartItems.filter(item => item.id !== action.payload.id);
      const totals = calculateTotals(updatedItems);
      return {
        ...state,
        cartItems: updatedItems,
        ...totals
      };
    }

    case UPDATE_CART_QUANTITY: {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        const updatedItems = state.cartItems.filter(item => item.id !== id);
        const totals = calculateTotals(updatedItems);
        return {
          ...state,
          cartItems: updatedItems,
          ...totals
        };
      }
      
      const updatedItems = state.cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      const totals = calculateTotals(updatedItems);
      return {
        ...state,
        cartItems: updatedItems,
        ...totals
      };
    }

    case CLEAR_CART:
      return initialCartState;

    default:
      return state;
  }
};

// Auth Reducer
export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };

    default:
      return state;
  }
};
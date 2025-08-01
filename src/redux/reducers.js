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
  items: [], // Đổi từ cartItems thành items
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
  // Ensure state has proper structure
  const currentState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    ...state
  };

  switch (action.type) {
    case ADD_TO_CART: {
      console.log('ADD_TO_CART reducer called with:', action.payload);
      console.log('Current state:', currentState);
      
      const { product, quantity = 1 } = action.payload;
      
      if (!product || !product.id) {
        console.error('Invalid product data:', product);
        return currentState;
      }

      // Ensure items array exists
      const items = currentState.items || [];
      const existingItem = items.find(item => item.id === product.id);
      
      let updatedItems;
      if (existingItem) {
        // Update quantity if item already exists
        updatedItems = items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        updatedItems = [...items, { ...product, quantity }];
      }
      
      const totals = calculateTotals(updatedItems);
      console.log('Updated cart state:', { items: updatedItems, ...totals });
      
      return {
        ...currentState,
        items: updatedItems,
        ...totals
      };
    }

    case REMOVE_FROM_CART: {
      // Ensure state has proper structure
      const currentState = {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        ...state
      };
      
      const items = currentState.items || [];
      const updatedItems = items.filter(item => item.id !== action.payload.id);
      const totals = calculateTotals(updatedItems);
      return {
        ...currentState,
        items: updatedItems,
        ...totals
      };
    }

    case UPDATE_CART_QUANTITY: {
      // Ensure state has proper structure
      const currentState = {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        ...state
      };
      
      const { id, quantity } = action.payload;
      const items = currentState.items || [];
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        const updatedItems = items.filter(item => item.id !== id);
        const totals = calculateTotals(updatedItems);
        return {
          ...currentState,
          items: updatedItems,
          ...totals
        };
      }
      
      const updatedItems = items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      const totals = calculateTotals(updatedItems);
      return {
        ...currentState,
        items: updatedItems,
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
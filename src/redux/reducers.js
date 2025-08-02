// Cart Actions
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

// Auth Actions
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOAD_USER_CART = 'LOAD_USER_CART';

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
      
      // Option 1: Always add as new item (no quantity increase)
      // const updatedItems = [...items, { ...product, quantity }];
      
      // Option 2: Standard cart behavior (increase quantity if exists)
      const existingItem = items.find(item => item.id === product.id);
      
      console.log(`Looking for existing item with ID ${product.id}:`, existingItem);
      
      let updatedItems;
      if (existingItem) {
        console.log(`Product already exists! Current quantity: ${existingItem.quantity}, adding: ${quantity}`);
        // Update quantity if item already exists
        updatedItems = items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        console.log('Product is new, adding to cart');
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

    case LOAD_USER_CART: {
      const userCart = action.payload;
      console.log('LOAD_USER_CART reducer called with:', userCart);
      const newState = {
        items: userCart.items || [],
        totalItems: userCart.totalItems || 0,
        totalPrice: userCart.totalPrice || 0
      };
      console.log('New cart state after loading:', newState);
      return newState;
    }

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
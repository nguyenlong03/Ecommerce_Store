import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  getCartByUserId, 
  addToCart, 
  removeFromCart, 
  updateCartItemQuantity,
  clearCart 
} from '../api/CartAPI';

// Initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null,
  userId: 1 // Demo user ID - trong thực tế lấy từ authentication
};

// Action types
const CART_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_CART: 'SET_CART',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_ERROR: 'SET_ERROR'
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case CART_ACTIONS.SET_CART:
      const items = action.payload.products || [];
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      return {
        ...state,
        items,
        total: action.payload.total || 0,
        itemCount,
        loading: false,
        error: null
      };
    
    case CART_ACTIONS.ADD_ITEM:
      const existingIndex = state.items.findIndex(
        item => item.productId === action.payload.productId
      );
      
      let newItems;
      if (existingIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }
      
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: newItems,
        itemCount: newItemCount,
        error: null
      };
    
    case CART_ACTIONS.REMOVE_ITEM:
      const filteredItems = state.items.filter(
        item => item.productId !== action.payload
      );
      const filteredItemCount = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: filteredItems,
        itemCount: filteredItemCount,
        error: null
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY:
      const updatedItems = state.items.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      const updatedItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItemCount,
        error: null
      };
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
        error: null
      };
    
    case CART_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
};

// Context
const CartContext = createContext();

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart on mount
  useEffect(() => {
    const initializeCart = async () => {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      try {
        const cart = await getCartByUserId(state.userId);
        dispatch({ type: CART_ACTIONS.SET_CART, payload: cart });
      } catch (error) {
        console.error('Failed to load cart:', error);
        dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to load cart' });
      }
    };
    
    initializeCart();
  }, [state.userId]);

  const loadCart = async () => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    try {
      const cart = await getCartByUserId(state.userId);
      dispatch({ type: CART_ACTIONS.SET_CART, payload: cart });
    } catch (error) {
      console.error('Failed to load cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to load cart' });
    }
  };

  const addItemToCart = async (productId, quantity = 1) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    try {
      await addToCart(state.userId, productId, quantity);
      dispatch({ 
        type: CART_ACTIONS.ADD_ITEM, 
        payload: { productId, quantity } 
      });
      await loadCart(); // Reload to sync with server
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to add item to cart' });
    }
  };

  const removeItemFromCart = async (productId) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    try {
      await removeFromCart(state.userId, productId);
      dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
      await loadCart(); // Reload to sync with server
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to remove item from cart' });
    }
  };

  const updateItemQuantity = async (productId, quantity) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    try {
      await updateCartItemQuantity(state.userId, productId, quantity);
      dispatch({ 
        type: CART_ACTIONS.UPDATE_QUANTITY, 
        payload: { productId, quantity } 
      });
      await loadCart(); // Reload to sync with server
    } catch (error) {
      console.error('Failed to update item quantity:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to update item quantity' });
    }
  };

  const clearCartItems = async () => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    try {
      await clearCart(state.userId);
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to clear cart' });
    }
  };

  const value = {
    ...state,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCartItems,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

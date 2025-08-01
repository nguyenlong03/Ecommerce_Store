import axios from './CustomAxios';

// API endpoints cho giỏ hàng
const CART_API = '/carts';

// Lấy toàn bộ giỏ hàng
export const getAllCarts = async () => {
  try {
    const response = await axios.get(CART_API);
    return response.data;
  } catch (error) {
    console.error('Error fetching all carts:', error);
    throw error;
  }
};

// Lấy chi tiết giỏ hàng theo id
export const getCartById = async (id) => {
  try {
    const response = await axios.get(`${CART_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cart with id ${id}:`, error);
    throw error;
  }
};

// Lấy giỏ hàng của người dùng userId
export const getCartByUserId = async (userId) => {
  try {
    const response = await axios.get(`${CART_API}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cart for user ${userId}:`, error);
    throw error;
  }
};

// Tạo giỏ hàng mới
export const createCart = async (cartData) => {
  try {
    const response = await axios.post(CART_API, cartData);
    return response.data;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
};

// Cập nhật giỏ hàng
export const updateCart = async (id, cartData) => {
  try {
    const response = await axios.put(`${CART_API}/${id}`, cartData);
    return response.data;
  } catch (error) {
    console.error(`Error updating cart with id ${id}:`, error);
    throw error;
  }
};

// Xóa giỏ hàng
export const deleteCart = async (id) => {
  try {
    const response = await axios.delete(`${CART_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting cart with id ${id}:`, error);
    throw error;
  }
};

// Helper functions cho giỏ hàng

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (userId, productId, quantity = 1) => {
  try {
    // Kiểm tra xem user đã có giỏ hàng chưa
    let cart;
    try {
      cart = await getCartByUserId(userId);
    } catch (error) {
      // Nếu chưa có giỏ hàng, tạo mới
      cart = await createCart({
        userId: userId,
        products: [],
        total: 0,
        date: new Date().toISOString()
      });
    }

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.products.findIndex(
      item => item.productId === productId
    );

    if (existingProductIndex >= 0) {
      // Nếu đã có, cập nhật số lượng
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Nếu chưa có, thêm mới
      cart.products.push({
        productId: productId,
        quantity: quantity
      });
    }

    // Cập nhật giỏ hàng
    return await updateCart(cart.id, cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (userId, productId) => {
  try {
    const cart = await getCartByUserId(userId);
    cart.products = cart.products.filter(item => item.productId !== productId);
    return await updateCart(cart.id, cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartItemQuantity = async (userId, productId, quantity) => {
  try {
    const cart = await getCartByUserId(userId);
    const productIndex = cart.products.findIndex(
      item => item.productId === productId
    );
    
    if (productIndex >= 0) {
      if (quantity <= 0) {
        // Nếu số lượng <= 0, xóa sản phẩm
        cart.products.splice(productIndex, 1);
      } else {
        // Cập nhật số lượng
        cart.products[productIndex].quantity = quantity;
      }
      return await updateCart(cart.id, cart);
    }
    throw new Error('Product not found in cart');
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
};

// Làm trống giỏ hàng
export const clearCart = async (userId) => {
  try {
    const cart = await getCartByUserId(userId);
    cart.products = [];
    cart.total = 0;
    return await updateCart(cart.id, cart);
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

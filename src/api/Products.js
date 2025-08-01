import CustomAxios from './CustomAxios';

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await CustomAxios.get('/products');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Lỗi khi lấy danh sách sản phẩm'
    };
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await CustomAxios.get(`/products/${id}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Lỗi khi lấy thông tin sản phẩm'
    };
  }
};

// Create new product
export const createProduct = async (productData) => {
  try {
    const response = await CustomAxios.post('/products', productData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Lỗi khi tạo sản phẩm mới'
    };
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const response = await CustomAxios.put(`/products/${id}`, productData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error updating product:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Lỗi khi cập nhật sản phẩm'
    };
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await CustomAxios.delete(`/products/${id}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Lỗi khi xóa sản phẩm'
    };
  }
};

import CustomAxios from "./CustomAxios";

export const getAllProducts = async () => {
  try {
    const response = await CustomAxios.get("/products");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await CustomAxios.get(`/products/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await CustomAxios.get(`/products/category/${category}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await CustomAxios.get("/products/categories");
    return response;
  } catch (error) {
    throw error;
  }
};
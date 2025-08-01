import customAxios from "./CustomAxios";

// Base URL cho users API
const USERS_API_URL = "https://fakestoreapi.com/users";

// GET /users - Lấy tất cả người dùng
export const getAllUsers = async () => {
  try {
    const response = await customAxios.get(USERS_API_URL);
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// GET /users/{id} - Lấy chi tiết user theo id
export const getUserById = async (id) => {
  try {
    const response = await customAxios.get(`${USERS_API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

// POST /users - Tạo người dùng mới
export const createUser = async (userData) => {
  try {
    const response = await customAxios.post(USERS_API_URL, userData);
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// PUT /users/{id} - Cập nhật thông tin user
export const updateUser = async (id, userData) => {
  try {
    const response = await customAxios.put(`${USERS_API_URL}/${id}`, userData);
    return response;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

// DELETE /users/{id} - Xoá user
export const deleteUser = async (id) => {
  try {
    const response = await customAxios.delete(`${USERS_API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};

// Utility function để format user data
export const formatUserData = (user) => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    password: user.password,
    name: {
      firstname: user.name?.firstname || '',
      lastname: user.name?.lastname || ''
    },
    address: {
      city: user.address?.city || '',
      street: user.address?.street || '',
      number: user.address?.number || '',
      zipcode: user.address?.zipcode || '',
      geolocation: {
        lat: user.address?.geolocation?.lat || '',
        long: user.address?.geolocation?.long || ''
      }
    },
    phone: user.phone || ''
  };
};

import CustomAxios from "./CustomAxios";

const Login = async (username, password) => {
  try {
    const response = await CustomAxios.post("/auth/login", { username, password });
    return response;
  } catch (error) {
    throw error;
  }
};  

export default Login;


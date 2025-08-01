import axios from "axios";

const CustomAxios = axios.create({
    baseURL: "https://fakestoreapi.com/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

CustomAxios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
CustomAxios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
export default CustomAxios;



import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  // "https://msb.etherstaging.xyz/api/",
  // "https://apimas.etherstaging.xyz/public/api"
  // https://masapi.etherstaging.xyz/api
  // https://apimas.etherstaging.xyz/public/api/
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for debugging
instance.interceptors.request.use(
  (config) => {
    // console.log("API Request:", {
    //   url: config.url,
    //   method: config.method,
    //   data: config.data,
    // });
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling and debugging
instance.interceptors.response.use(
  (response) => {
    // console.log("API Response:", {
    //   url: response.config.url,
    //   status: response.status,
    //   data: response.data,
    // });
    return response;
  },
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export default instance;

import axios from "axios";
const instance = axios.create({
  baseURL: "https://masapi.etherstaging.xyz/api",
  // https://masapi.etherstaging.xyz/api
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default instance;

import axios from "axios";
const instance = axios.create({
  baseURL: "https://msb.etherstaging.xyz/api/",
  // "https://apimas.etherstaging.xyz/public/api"
  // https://masapi.etherstaging.xyz/api
  // https://apimas.etherstaging.xyz/public/api/

  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default instance;

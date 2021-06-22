import axios from "axios";
import { apiUrl, token } from "../services/constant";

const instance = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
});

instance.interceptors.request.use(function (config) {
  config.headers["token"] = token;
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default instance;

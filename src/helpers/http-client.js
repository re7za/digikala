import axios from "axios";
import { apiUrl, token } from "../services/constant";
// import { authenticationService } from "../services/Authentication";

const instance = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
});

// const currentUser = authenticationService.currentUserValue;

instance.interceptors.request.use(function (config) {
  // config.headers["ApplicationId"] = "sadra.neel.ir";
  // if (currentUser?.token) {
  config.headers["Authorization"] = `Bearer ${token}`;
  // }
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default instance;

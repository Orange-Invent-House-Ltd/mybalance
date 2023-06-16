import axios from "axios";
import { LoginInput } from "../pages/auth/Login";
//create an Axios instance with a config to prevent us from repeating these options in every request
const BASE_URL = "http://ec2-3-86-147-94.compute-1.amazonaws.com/v1";

export const publicApi = axios.create({
  baseURL: BASE_URL,
});
export const privateApi = axios.create({
  baseURL: BASE_URL,
});
privateApi.interceptors.request.use((config) => {
  const sessionToken = localStorage.getItem("session_token");

  if (sessionToken) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    } else {
      config.headers = { Authorization: `Bearer ${sessionToken}` };
    }
  }

  return config;
});
// publicApi.defaults.headers.common["Content-Type"] = "application/json";

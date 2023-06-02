import axios from "axios";
//create an Axios instance with a config to prevent us from repeating these options in every request
const BASE_URL = "http://ec2-3-86-147-94.compute-1.amazonaws.com/v1";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";
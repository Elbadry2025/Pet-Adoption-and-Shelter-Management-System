import axios from "axios";
import { getToken } from "./CurrentSession";


axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.headers.post["Content-Type"] = "application/json";


export const httpRequest = (method: string, url: string, data?: any) => {
  let headers = {};

  if (getToken() !== null && getToken() !== "null")
    headers = { Authorization: `Bearer ${getToken()}` };
  console.log(headers);

  return axios({
    method: method,
    headers: headers,
    url: url,
    data: data,
  });
};


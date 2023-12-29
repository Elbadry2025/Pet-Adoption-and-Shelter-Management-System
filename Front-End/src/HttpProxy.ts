import axios from "axios";
//import { getJwtToken } from "../CurrentSession";


axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.headers.post["Content-Type"] = "application/json";


export const httpRequest = (method: string, url: string, data?: any) => {
  let headers = {};

//   if (getJwtToken() !== null && getJwtToken() !== "null")
//     headers = { Authorization: `Bearer ${getJwtToken()}` };

  return axios({
    method: method,
    headers: headers,
    url: url,
    data: data,
  });
};

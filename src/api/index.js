/* http */
import axios from "axios";
import qs from "qs";
import { message } from "antd";

const baseURL = process.env.NODE_ENV === "production" ? "" : "";

let headers = { "Content-Type": "application/x-www-form-urlencoded" };

if (sessionStorage["token"]) {
  headers = {
    ...headers,
    Authorization: sessionStorage["token"],
  };
}

const http = axios.create({
  baseURL,
  timeout: 20000,
  headers,
});

http.interceptors.request.use(
  (config) => {
    config.data = qs.stringify(config.data); // 转为formdata数据格式
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    const { success, result_msg } = response.data;
    if (!success) {
      return Promise.reject(result_msg);
    }
    return response.data.body;
  },
  (error) => {
    const msg = error?.response?.data?.result_msg || error.toString();
    message.error(msg.includes("timeout") ? "请求超时！" : msg);
  }
);

export default http;

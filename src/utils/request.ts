import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { TaroAdapter } from "axios-taro-adapter";
import Taro from "@tarojs/taro";
import { stringify } from "qs";
// 帮助取消pending中的接口
let cancelToken: any = null;

const API_URL = "https://api.xxxx.com/";

export interface Response<T = any> {
  code: number;
  msg: string;
  result: T;
}

const instance: AxiosInstance = axios.create({
  baseURL: "API_URL",
  timeout: 10000,
  withCredentials: true,
  paramsSerializer: params =>
    stringify(Object.assign(params, { appid: 10003 }), {
      arrayFormat: "comma",
      skipNulls: true
    }),
  adapter: TaroAdapter // 添加这一行替换默认的适配器
});
instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    let token = Taro.getStorageSync("token") || "";
    config.cancelToken = new axios.CancelToken(c => (cancelToken = c));
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        appid: 1200,
        deviceId: "18d6cce10f64daac"
      };
    }
    console.log(process.env.NODE_ENV )
    let res = await Taro.getNetworkType();
    if (res.networkType == "none") {
      Taro.showToast({
        title: "网络请求失败，请检查您的网络设置",
        icon: "none"
      });
      return;
    }
    return config;
  },
  error => {
    console.log(error);
  }
);
// 响应回来后做什么
instance.interceptors.response.use((response: AxiosResponse<Response>) => {
  const { data } = response;
  if ([200].includes(data.code)) {
    // 请求成功 写token
    Taro.setStorage({
      key: "token",
      data: data.msg
    });
    return data;
  }
  return Promise.reject(Object.assign(response, { response }));
});
export default instance;
export { cancelToken };

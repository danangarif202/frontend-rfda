import axios from "axios";
import httpInterceptor from "./interceptor.plugin";

const token = axios.CancelToken.source();

const httpPlugin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVICE_V2,
  timeout: 15000,
  // cancelToken: token,
});

httpPlugin.interceptors.request.use(
  httpInterceptor.interceptorsRequestConf,
  httpInterceptor.interceptorsRequestErr
);

httpPlugin.interceptors.response.use(
  httpInterceptor.interceptorsResponseConfig,
  httpInterceptor.interceptorsResponseErr
);

export const cancelToken = token;

export default httpPlugin;

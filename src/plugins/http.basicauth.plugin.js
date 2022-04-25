import axios from "axios";
import httpInterceptor from "./interceptor.plugin";

const httpPlugin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVICE_V2,
  timeout: 5000,
});

httpPlugin.interceptors.request.use(
  httpInterceptor.interceptorsRequestConfBasicAuth,
  httpInterceptor.interceptorsRequestErr
);

httpPlugin.interceptors.response.use(
  httpInterceptor.interceptorsResponseConfig,
  httpInterceptor.interceptorsResponseErr
);

export default httpPlugin;

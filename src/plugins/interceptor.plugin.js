import storageKey from "../key/storage.key";
import storagePlugin from "./storage.plugin";

const httpInterceptor = {
  interceptorsRequestConf(config) {
    const { url } = config;
    const token = storagePlugin.getStr(storageKey.storeToken);

    if (!url.includes("/login")) {
      if (token != null) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },

  interceptorsRequestErr(error) {
    return Promise.reject(error);
  },

  interceptorsResponseConfig(config) {
    return config;
  },

  interceptorsResponseErr(error) {
    return Promise.reject(error);
  },
};

export default httpInterceptor;

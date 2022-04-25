const storagePlugin = {
  saveObj(key, data = {}) {
    const dataStr = JSON.stringify(data);
    window.localStorage.setItem(key, dataStr);
  },

  saveStr(key, str) {
    localStorage.setItem(key, str);
  },

  getObj(key) {
    if (typeof window !== "undefined") {
      const dataStr = localStorage.getItem(key);
      const data = JSON.parse(dataStr);

      return data;
    }
  },

  getStr(key) {
    if (typeof window !== "undefined") {
      const str = localStorage.getItem(key);

      return str;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  isExist(key) {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(key);

      if (data !== null) {
        return true;
      }
    }

    return false;
  },
};

export default storagePlugin;

import httpPlugin from "../plugins/http.plugin";

const config = {
  path: "https://soal.staging.id/api/menu",
};

const menuApi = {
  async browse(params) {
    try {
      const resp = await httpPlugin.post(config.path, params);
      return resp.data;
    } catch (error) {
      throw error;
    }
  },
};

export default menuApi;

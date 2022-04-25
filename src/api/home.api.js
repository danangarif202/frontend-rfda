import httpPlugin from "../plugins/http.plugin";

const config = {
  path: "https://soal.staging.id/api/home",
};

const homeApi = {
  async browse(token) {
    try {
      const resp = await httpPlugin.get(config.path, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return resp.data;
    } catch (error) {
      throw error;
    }
  },
};

export default homeApi;

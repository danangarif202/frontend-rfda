import httpPluginV2 from "../plugins/http.plugin.v2";

const pathURL = `https://soal.staging.id/oauth/token`;

const authApi = {
  async login(cred) {
    try {
      const data = await httpPluginV2.post(`${pathURL}`, cred);
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default authApi;

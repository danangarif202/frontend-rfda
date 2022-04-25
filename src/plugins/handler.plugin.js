const handlerPlugin = {
  api(funcApi) {
    try {
      funcApi();
    } catch (error) {
      throw error;
    }
  },
};

export default handlerPlugin;

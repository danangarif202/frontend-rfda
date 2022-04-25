import homeType from "./home.type";
import storePlugin from "../../plugins/store.plugin";
import homeApi from "../../api/home.api";

const homeAction = {
  browse(params) {
    return async (dispatch) => {
      storePlugin.action(async () => {
        const data = await homeApi.browse(params);
        dispatch({ type: homeType.HOME_BROWSE, payload: data });
      }, dispatch);
    };
  },

  reset() {
    return (dispatch) => {
      dispatch({ type: homeType.HOME_RESET });
    };
  },
};

export default homeAction;

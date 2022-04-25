import { showAlert } from "../stores/alert/alert.action";
import alertType from "../stores/alert/alert.type";

const storePlugin = {
  async action(callback, dispatch, onError = () => {}) {
    try {
      await callback();
    } catch (error) {
      showAlert(dispatch, alertType.ALERT_TOGGLE_DANGER, error.message);
      onError(error);
    }
  },
};

export default storePlugin;

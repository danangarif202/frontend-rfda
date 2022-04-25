import { combineReducers } from "redux";
import alertStore from "./alert/alert.store";
import authStore from "./auth/auth.store";
import homeStore from "./home/home.store";
import menuStore from "./menu/menu.store";

export default combineReducers({
  alert: alertStore,
  auth: authStore,
  home: homeStore,
  menu: menuStore,
});

import homeType from "./home.type";

const initState = {};

function homeStore(state = initState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case homeType.HOME_BROWSE:
      return {
        ...state,
        payload,
      };

    case homeType.HOME_RESET:
      return initState;

    default:
      return state;
  }
}

export default homeStore;

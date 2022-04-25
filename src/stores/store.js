import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import storeReducer from "./store.reducer";

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: storeReducer,
    middleware: [...getDefaultMiddleware()],
    preloadedState,
    enhancers: [],
  });

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./store.reducer", () =>
      store.replaceReducer(storeReducer)
    );
  }

  return store;
}

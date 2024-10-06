import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";

import { authSessionListenerMiddleware, preloadSession } from "./middleware";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  preloadedState: {
    auth: preloadSession().auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authSessionListenerMiddleware.middleware, baseApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

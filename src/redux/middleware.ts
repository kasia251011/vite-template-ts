import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { AuthState, clearAuthToken, setAuthToken } from "./slice/auth";

const AUTH_TOKEN_KEY = "AUTH_TOKEN";

export const authSessionListenerMiddleware = createListenerMiddleware();
export const sandboxCacheListenerMiddleware = createListenerMiddleware();

interface SessionState {
  auth: AuthState;
}

authSessionListenerMiddleware.startListening({
  matcher: isAnyOf(setAuthToken, clearAuthToken),
  effect: (_action, listenerApi) => {
    const authToken = (listenerApi.getState() as RootState).auth.token ?? "";
    window.localStorage.setItem(AUTH_TOKEN_KEY, authToken);
  },
});

export function preloadSession(): SessionState {
  const authToken = window.localStorage.getItem(AUTH_TOKEN_KEY);

  return {
    auth: { token: authToken ?? "" },
  };
}

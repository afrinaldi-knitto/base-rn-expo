import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginService } from "./api/login-api";
import loginReducer from "./slice/login-slice";

const rootReducer = combineReducers({
  login: loginReducer,
  [loginService.reducerPath]: loginService.reducer,
});

const apiMiddleware = [loginService.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

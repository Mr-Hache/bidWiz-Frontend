import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import filtersReducer from "./services/filtersSlice";
import wizardsReducer from "./services/wizardsSlice";
import userAuthReducer from "./services/userAuthSlice";
import themeSlice from "./services/themeSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    filters: filtersReducer,
    wizards: wizardsReducer,
    userAuth: userAuthReducer,
    theme: themeSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import productSlice from "./products/productSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./user/userSlice";

const commonConfig = {
  key: "shop/user",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLogin", "token"],
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    product: productSlice,
    user: persistReducer(userConfig, userSlice),
  },
});

export const persistor = persistStore(store);
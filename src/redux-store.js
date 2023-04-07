import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { productReducer, autherizedReducer } from "./slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const PersistConfig = {
  key: "persisit-key",
  storage,
};
const rootReducer = combineReducers({
  product: productReducer,
  autherized: autherizedReducer,
});
const persistedReducer = persistReducer(PersistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
const persisitor = persistStore(store);
export default store;
export { persisitor };

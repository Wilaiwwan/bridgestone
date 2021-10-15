import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
// import {
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   persistReducer,
//   persistStore,
//   PURGE,
//   REGISTER,
//   REHYDRATE
// } from "redux-persist";
import globalSlice from './modules/globalSlice';


const rootReducer = combineReducers({
  global: globalSlice
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware({
  //   serializableCheck: {
  //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //   },
  // }),
});

// export const persistor = persistStore(store);

export default store;

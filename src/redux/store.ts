import {
    Action,
    configureStore,
    ThunkAction,
  } from "@reduxjs/toolkit";
  import appReducer from "./app/appSlice";
  
  const store = configureStore({
    reducer: {
      app: appReducer,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;
  
  export default store;
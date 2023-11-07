// configure the store
import { configureStore } from "@reduxjs/toolkit";
import testerSlice from "./testerSlice";

const store = configureStore({
  reducer: {
    tester : testerSlice.reducer,
  },
});


export default store;
// configure the store
import { configureStore } from "@reduxjs/toolkit";
import testerSlice from "./testerSlice";
import blockSlice from "./blockSlice";

const store = configureStore({
  reducer: {
    tester: testerSlice.reducer,
    block: blockSlice.reducer,
  },
});

export default store;

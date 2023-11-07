import { createSlice } from "@reduxjs/toolkit";

const testerSlice = createSlice({
  name: "tester",
  initialState: {
    testerDataList: [],
  },
  reducers: {
    addToTesterData(state, action) {
      state.testerDataList = action.payload;
    },
  },
});

export const { addToTesterData } = testerSlice.actions;

export default testerSlice;

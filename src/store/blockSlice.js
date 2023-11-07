import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testedBlocks: null,
  blockimageUrl: [],
};

const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    testedBlockById(state, action) {
      state.testedBlocks = action.payload;
    },
    addingImgUrl(state, action) {
      state.blockimageUrl.push(action.payload);
    },
  },
});

export const { testedBlockById, addingImgUrl } = blockSlice.actions;
export default blockSlice;

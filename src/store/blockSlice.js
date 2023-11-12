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
      let imgUrl = action.payload
      state.blockimageUrl.push(imgUrl);
    },

    removeFirstAddNew(state, action) {
      state.blockimageUrl.shift();
      state.blockimageUrl.push(action.payload);
    },
  },
});

export const { testedBlockById, addingImgUrl, removeFirstAddNew } =
  blockSlice.actions;
export default blockSlice;

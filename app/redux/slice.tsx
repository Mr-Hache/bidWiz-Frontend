import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "joaquin",
};

export const Slice = createSlice({
  name: "name",
  initialState,
  reducers: {
    guardarNombre: (state, action) => {
      state.name = action.payload;
    },

    // getWizards: (state, action) => {
    //   state.allWizards = action.payload;
    // },
  },
});

export const { guardarNombre } = Slice.actions;

export default Slice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    page: 1,
    subjects: [],
    languages: [],
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
  },
});


export const { setPage, setSubjects, setLanguages } = filtersSlice.actions;

export default filtersSlice.reducer;

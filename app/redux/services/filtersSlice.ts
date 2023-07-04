import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    page: 1,
    subjects: [],
    languages: [],
    sortByReviews: "",
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
    setSortByReviews: (state, action) => {
      state.sortByReviews = action.payload;
    },
  },
});


export const { setPage, setSubjects, setLanguages, setSortByReviews } = filtersSlice.actions;

export default filtersSlice.reducer;

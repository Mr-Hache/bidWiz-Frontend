import { createSlice } from '@reduxjs/toolkit';

export const userAuthSlice = createSlice({

  name: 'userAuth',
  initialState:
  {
    user: null as string | null,
    uid: null as string | null,
    email: null as string | null,
    auth: false as boolean,

  },
  reducers: {

    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;

    },
    setAuth: (state, action) => {
      state.auth = action.payload;

    },
  },
}
)

export const { setUid, setAuth, setEmail, setUser } = userAuthSlice.actions;
export default userAuthSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import {User} from "./userApi"

export const wizardsSlice = createSlice({
    name: 'wizards',
    initialState: {
        wizards: [] as User[],
    },
    reducers: {
        setWizards: (state, action) => {
            state.wizards = action.payload;
          },
    }
})

export const { setWizards } = wizardsSlice.actions;

export default wizardsSlice.reducer;

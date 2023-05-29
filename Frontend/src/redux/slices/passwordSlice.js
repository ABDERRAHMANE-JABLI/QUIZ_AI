import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
    name:"password",
    initialState : {
       invalidLink : null,
    },
    reducers: {
        setInvalideLink(state,action){
            state.invalidLink = action.payload;
        },
    }
});

const passwordReducer = passwordSlice.reducer;
const passwordActions = passwordSlice.actions;

export {passwordReducer, passwordActions}
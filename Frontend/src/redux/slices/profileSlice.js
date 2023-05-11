import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name:"profile",
    initialState : {
       profile : null,
    },
    reducers: {
        setProfile(state,action){
            state.profile = action.payload;
        },
        setProfilePhoto(state, action){
            state.profile.photo = action.payload
        },
        update_Profile(state, action){
            state.profile = action.payload;
        }
    }
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export {profileReducer, profileActions}
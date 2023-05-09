import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name:"profil",
    initialState : {
       profile : null,
    },
    reducers: {
        setProfile(state,action){
            state.profile = action.payload;
        },
        setProfilePhoto(state, action){
            state.profile.photo = action.payload
        }
    }
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export {profileReducer, profileActions}
//login et register et logout :
import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name:"auth",
    initialState : {
        user : localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
        registreMsg : null,
        isEmailverified : false,
    },
    reducers: {
        login(state, action){
            state.user = action.payload;
            // payload contient la reponse du serveur
        },
        logout(state){
            state.user = null;
        },
        registreUser(state, action){
            state.registreMsg = action.payload;
        },
        setPhoto(state, action){
            state.user.photo = action.payload;
            // payload contient la reponse du serveur
        },
        setProfile(state, action){
            state.user.firstname = action.payload;
        },
        setisEmailverified(state){
            state.isEmailverified = true;
            state.registreMsgProf = null;
        }
    }
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export {authReducer, authActions}
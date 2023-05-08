//login et register et logout :
// send request to the server
import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name:"auth",
    initialState : {
        user : localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
        registreMsgProf : null,
    },
    reducers: {
        login(state, action){
            state.user = action.payload;
            // payload contient la reponse du serveur
        },
        logout(state){
            state.user = null;
        },
        registreProf(state, action){
            state.registreMsgProf = action.payload;
        }
    }
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export {authReducer, authActions}
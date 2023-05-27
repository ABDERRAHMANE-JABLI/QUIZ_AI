import {configureStore} from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { classeReducer } from "./slices/classeSlice";
import { inscriptionReducer } from "./slices/inscriptionSlice";

const store = configureStore({
    reducer:{
        auth : authReducer,
        profile : profileReducer,
        classe : classeReducer,
        inscription : inscriptionReducer,
    }
});
export default store;
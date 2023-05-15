import {configureStore} from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { classeReducer } from "./slices/classeSlice";

const store = configureStore({
    reducer:{
        auth : authReducer,
        profile : profileReducer,
        classe : classeReducer,
    }
});
export default store;
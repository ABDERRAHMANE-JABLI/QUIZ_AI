import { createSlice } from "@reduxjs/toolkit";

const inscriptionSlice = createSlice({
    name:"inscription",
    initialState : {
       msgInscription : null,
    },
    reducers: {
        setInscription(state,action){
            state.msgInscription = action.payload;
        },
    }
});

const inscriptionReducer = inscriptionSlice.reducer;
const inscriptionActions = inscriptionSlice.actions;

export {inscriptionReducer, inscriptionActions}
import { createSlice } from "@reduxjs/toolkit";

const classeSlice = createSlice({
    name:"classe",
    initialState : {
        classes : [],
        NbrClasses : null,
    },
    reducers: {
        setClasses(state,action){
            state.classes = action.payload;
        },
        setNbrClasses(state, action){
            state.NbrClasses = action.payload;
        },
        setCreateClasse(state, action){
            state.classes.unshift(action.payload);
        },
        setDeleteClasse(state, action){
            state.classes = state.classes.filter(object => object._id !== action.payload );
        }
    }
});

const classeReducer = classeSlice.reducer;
const classeActions = classeSlice.actions;

export {classeReducer, classeActions}
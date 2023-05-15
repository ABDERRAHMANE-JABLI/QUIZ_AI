import { classeActions } from "../slices/classeSlice";
import {toast} from 'react-toastify'
import axios from "axios"

//Afficher toutes les classes du prof connecté : 
export function getClasses(){
    return async(dispatch,getState) =>{
        try {
            const {data} = await axios.get("http://localhost:8000/api/classrooms",{
                headers : {
                Authorization : "Bearer "+getState().auth.user.token,
            }});
            dispatch(classeActions.setClasses(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// ajouter une nouvelle classe : 
export function createClasse(newClasse){
    return async(dispatch,getState) =>{
        try {
            const {data} = await axios.post("http://localhost:8000/api/classrooms", newClasse, {
                headers : {
                Authorization : "Bearer "+getState().auth.user.token,
                "Content-Type" : "multipart/form-data"
            }});
            dispatch(classeActions.setCreateClasse(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
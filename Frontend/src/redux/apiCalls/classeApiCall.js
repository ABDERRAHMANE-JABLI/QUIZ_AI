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
// afficher une seule : 
export function getSingleClasse(idClasse){
    return async(dispatch) =>{
        try {
            const {data} = await axios.get(`http://localhost:8000/api/classrooms/${idClasse}`);
            dispatch(classeActions.setOneClasse(data));
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
            //toast.success("La Classe est ajouté avec succès");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
}

// ajouter une nouvelle classe : 
export function delete_Classe(idClasse){
    return async(dispatch,getState) =>{
        try {
            const {data} = await axios.delete(`http://localhost:8000/api/classrooms/${idClasse}`, {
                headers : {
                Authorization : "Bearer "+getState().auth.user.token,
            }});
            dispatch(classeActions.setDeleteClasse(data.classeId));
            toast.success("La Classe est supprimé avec succès");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
}

//http://localhost:8000/api/classrooms/646222d30a1f14f48c25c8cd/Students
//Afficher  les etudiants qui appartient a la classe selectionné: 
export function getStudents(idClasse){
    return async(dispatch,getState) =>{
        try {
            const {data} = await axios.get(`http://localhost:8000/api/classrooms/${idClasse}/Students`,{
                headers : {
                Authorization : "Bearer "+getState().auth.user.token,
            }});
            dispatch(classeActions.setStudentsClasse(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
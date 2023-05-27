///subscrib/:id
import {toast} from 'react-toastify'
import axios from "axios"
import { inscriptionActions } from '../slices/inscriptionSlice';
import { classeActions } from "../slices/classeSlice";


export function subscrib(idClasse,etudiant){
    return async(dispatch,getState) =>{
        try {
            const {data} = await axios.post(`http://localhost:8000/api/students/subscrib/${idClasse}`,etudiant,{
                headers:{
                    authorization:"Bearer "+getState().auth.user.token,
                }
            });
            dispatch(inscriptionActions.setInscription(data.message));
            toast.success(data.message);
            console.log(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
            //console.log(error);

        }
    }
}

// La fonction retirer etudaint (annuler inscription de etudaint dans la classe) : /unSubscrib/:id
export function unSubscrib(idClasse, etudiant){
    return async(dispatch, getState) =>{
        try {
            const {data} = await axios.delete(`http://localhost:8000/api/students/${etudiant}/unSubscrib/${idClasse}`,{
                headers:{
                    Authorization:"Bearer "+getState().auth.user.token,
                }
            });
            dispatch(classeActions.setUnSubscribe(data.id));
            toast.success(data.message);
            console.log(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
            //console.log(error);
        }
    }
}
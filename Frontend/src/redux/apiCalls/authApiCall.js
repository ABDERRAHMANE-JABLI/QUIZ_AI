// send request to the server
import { authActions } from "../slices/authSlice";
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';

//login user : 
export function loginUser(user){
    return async(dispatch) =>{
        try {
                /*const response = await fetch("http://localhost:8000/api/auth/Login", {
                method:"POST",
                body : JSON.stringify(user),
                headers:{
                    "Content-Type" : "application/json"
                }
            });*/
            const {data} = await axios.post("http://localhost:8000/api/auth/Login",user);
            dispatch(authActions.login(data));
            localStorage.setItem("userInfo", JSON.stringify(data));
            data.role === "etudiant" ? window.location.href = '/Students-Dashboard': window.location.href = '/Analytics';   
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// se deconnecter : *********************
export function logoutUser(){
    return async(dispatch) =>{
        dispatch(authActions.logout()); 
        localStorage.removeItem("userInfo");
        window.location.href = '/';
    }
}

// registre professor : ********************************************************************************


export function Registre(user) {
  return async () => {
    try {
      // Afficher un indicateur de chargement
      toast.promise(
        axios.post("http://localhost:8000/api/auth/registre", {
          "firstname": user.firstname,
          "lastname": user.lastname,
          "email": user.email,
          "tel": user.tel,
          "password": user.password,
          "role": user.role
        }),
        {
          pending: 'En cour ...',
          success: (response) => response.data.message,
          error: (error) => {
            throw new Error(error.response.data.message);
          }
        }
      );
    } catch (error) {
      // Afficher un message d'erreur
      toast.error(error.message);
    }
  };
}


// registre Student : ********************************************************************************
/*export function RegistreStudent(user){
    //  alert();
    return async(dispatch) =>{
        try {
           const{data}  = await axios.post("http://localhost:8000/api/auth/register_student",{"firstname":user.firstname,"lastname":user.lastname,"email":user.email,"tel":user.tel,"password":user.password});
            dispatch(authActions.registreUser(data.message));
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }
}*/

export function verify_Email(userId, token){
    return async(dispatch) =>{
        try {
            await axios.get(`http://localhost:8000/api/auth/${userId}/verify/${token}`);
            dispatch(authActions.setisEmailverified());
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }
}

// lorsque etudiant veut s'inscrire dans une classe il doit s'indentifier pour cela on applique cette methode
export function loginSubscrib(user){
    return async(dispatch) =>{
        try {
            const {data} = await axios.post("http://localhost:8000/api/auth/Login",user);
            dispatch(authActions.login(data));
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
// send request to the server
import { authActions } from "../slices/authSlice";
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import axios from "axios"

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
export function Registre(user){
   //console.log(user);
    return async() =>{
        try {
           const{data}  = await axios.post("http://localhost:8000/api/auth/registre",{"firstname":user.firstname,"lastname":user.lastname,"email":user.email,"tel":user.tel,"password":user.password,"role":user.role});
            //dispatch(authActions.registreUser(data.message));
            swal({
                title:data.message,
                icon:"success"
            });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
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
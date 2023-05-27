// send request to the server
import { authActions } from "../slices/authSlice";
import {toast} from 'react-toastify'
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
            data.role === "etudiant" ? window.location.href = '/dashboardStudent': window.location.href = '/analytics';   
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
export function RegistreProf(user){
    //  alert();
    return async(dispatch) =>{
        try {
           const{data}  = await axios.post("http://localhost:8000/api/auth/register_prof",{"firstname":user.firstname,"lastname":user.lastname,"email":user.email,"tel":user.tel,"password":user.password});
            dispatch(authActions.registreProf(data.message));
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }
}

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
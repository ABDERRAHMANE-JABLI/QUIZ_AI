// send request to the server
import { authActions } from "../slices/authSlice";
import {toast} from 'react-toastify'
//import "react-toastify/dist/ReactToastify.css"
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
            window.location.href = '/Analytics';   
        } catch (error) {
            toast.error(error.response.data.message);
           // console.log(error);
        }
    }
}

// se deconnecter : *********************
export function logoutUser(){
    return async(dispatch) =>{
        dispatch(authActions.logout());
        //window.location.href = '/';
        localStorage.removeItem("userInfo");
    }
}
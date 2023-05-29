import {toast} from 'react-toastify'
import axios from "axios"
import swal from 'sweetalert'

// mot de pass oublié : ********************************************************************************
export function sendResetLink(email){
    //  alert();
    return async() =>{
        try {
           const{data}  = await axios.post("http://localhost:8000/api/password/reset-password-link",email);
           swal({title:data.message, icon:"success"});
           //toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            window.location.href = '/Auth'
        }
    }
}


//pour verifier url envoyé a l'utilisateur
// /reset-password/:userId/:token
export function getResetLink(userid, token){
    //  alert();
    return async() =>{
        try {
           const{data}  = await axios.get(`http://localhost:8000/api/password/reset-password/${userid}/${token}`);
           console.log(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            window.location.href = '/Auth'
        }
    }
}


// changer le mot de passe
// /reset-password/:userId/:token
export function changePassword(userid, token, password){
    //  alert();
    return async() =>{
        try {
           const{data}  = await axios.post(`http://localhost:8000/api/password/reset-password/${userid}/${token}`,password);
           swal({title:data.message, icon:"success"}).then(isOk => {
            if(isOk){
                window.location.href = '/Auth';
            }
        })
        } catch (error) {
            toast.error(error.response.data.message);
            window.location.href = '/Auth'
        }
    }
}
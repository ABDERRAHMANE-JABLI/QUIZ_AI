import { profileActions } from "../slices/profileSlice";
import {authActions} from "../slices/authSlice";
import {toast} from 'react-toastify'
import axios from "axios"

export function GetUserProfile(userId){
    return async(dispatch, getState) =>{
        try {
            const {data} = await axios.get(`http://localhost:8000/api/prof/profile/${userId}`,{
                headers : {
                    Authorization : "Bearer "+getState().auth.user.token,
                }
            });
            dispatch(profileActions.setProfile(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

export function updatePhoto(photo){
    return async(dispatch, getState) =>{
        try {
            const {data} = await axios.post(`http://localhost:8000/api/prof/profile/upload_photo`,photo,{
                headers : {
                    Authorization : "Bearer "+getState().auth.user.token,
                    "Content-Type" : "multipart/form-data"
                }
            });
            dispatch(profileActions.setProfilePhoto(data.photo));
            toast.success(data.message);
            dispatch(authActions.setPhoto(data.photo));
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.photo = data.photo;
            localStorage.setItem("userInfo",JSON.stringify(user));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
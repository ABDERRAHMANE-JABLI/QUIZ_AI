import gif from '../../image/email1.gif'
import '../../style/verifyemail.css'
import {Link, useParams} from 'react-router-dom'
import { useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { verify_Email } from "../../redux/apiCalls/authApiCall";


const VerifyEmail = () => {

  const dispatch = useDispatch();

  const {userId, token} = useParams();
  const {isEmailverified} = useSelector(state => state.auth);

  useEffect(()=>{
    dispatch(verify_Email(userId, token));
    window.scrollTo(0, 0);
  }, [userId, token]);

  return (
    <div className='container-centered'>
      <div className="centered">
        <img src={gif} alt="verify email" width="300px" height="300px"/>
          {
            isEmailverified ? <><p className="title-success text-center mt-3">Email verified</p>
                        <Link to="/auth">Se connecter</Link></>
                        :
                        <>
                        <p className="title-error text-center">Email Not verified</p>
                        <Link to="/auth" className='d-block text-center'>S'inscrire</Link></>
          }
      </div>
    </div>
  )
}

export default VerifyEmail
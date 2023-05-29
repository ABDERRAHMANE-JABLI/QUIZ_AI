import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import logo from '../../image/logo_quiz2.png';
import gif from '../../image/email1.gif'
import { changePassword, getResetLink } from "../../redux/apiCalls/passwordApiCall";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {FaTimesCircle} from'react-icons/fa'

const ResetPassword = () => {
  const [password, setPass] = useState("");

  const dispatch = useDispatch();
  const {userId, token} = useParams();

  const {invalidLink} = useSelector(state => state.password);
  
  useEffect(()=>{
    dispatch(getResetLink(userId, token));
  },[]);

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(password.trim() === "") return toast.error("Password Obligatoire");
    dispatch(changePassword(userId, token, { password }));
  };

  return (
    <section className="container-centered">
      <ToastContainer
                      position="top-center"
                      autoClose={2500}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored"
                      />
        <div className="container-fluid d-flex justify-content-center p-2 shadow">
            <img src={logo} className="logo_quiz" alt="quiz ai" width="100px" height="70px" />
        </div>
    
        <div className="centered">
          {invalidLink ? <h3 className="text-danger"><FaTimesCircle/>  {invalidLink}</h3> :
           <><img src={gif} alt="verify email" width="250px" height="250px"/>
            <h3 className="text-capitaliaze">Votre Nouveau Mot de passe</h3>
            <form onSubmit={formSubmitHandler}>
                <div>
                    <input
                        onChange={(e) => setPass(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Enter your password"
                        className="form-control form-control-user mt-3"
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-4 w-100">
                Valider
                </button>
            </form>
            </>}
        </div>
      
    </section>
  );
};

export default ResetPassword;
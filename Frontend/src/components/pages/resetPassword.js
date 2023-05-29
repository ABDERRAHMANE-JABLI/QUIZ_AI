import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import logo from '../../image/logo_quiz2.png';
import gif from '../../image/email1.gif'
import { changePassword, getResetLink } from "../../redux/apiCalls/passwordApiCall";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


const ResetPassword = () => {
  const [password, setPass] = useState("");

  const dispatch = useDispatch();
  const {userId, token} = useParams();

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
        <div className="container-fluid d-flex justify-content-center p-2 shadow">
            <img src={logo} className="logo_quiz" alt="quiz ai" width="100px" height="70px" />
        </div>
    
        <div className="centered">
            <img src={gif} alt="verify email" width="250px" height="250px"/>
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
        </div>
      
    </section>
  );
};

export default ResetPassword;
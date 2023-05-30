import { toast } from "react-toastify";
import { useState } from "react";
import logo from '../../image/logo_quiz2.png';
import gif from '../../image/email1.gif'
import { useDispatch } from "react-redux";
import { sendResetLink } from "../../redux/apiCalls/passwordApiCall";
import { ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(email.trim() === "") return toast.error("Email Obligatoire");
    dispatch(sendResetLink({ email }));
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
            <img src={gif} alt="verify email" width="250px" height="250px"/>
            <h3 className="text-capitaliaze">Mot de passe oublié ?</h3>
            <form onSubmit={formSubmitHandler}>
                <div>
                    <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="form-control form-control-user mt-3"
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-4 w-100">
                Envoyer
                </button>
            </form>
        </div>
      
    </section>
  );
};

export default ForgotPassword;
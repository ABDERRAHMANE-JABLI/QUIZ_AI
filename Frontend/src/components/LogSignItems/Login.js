import {Button, Linkbtn} from "./components"
import React from 'react';
import {FaGofore, FaSignInAlt} from 'react-icons/fa'
import { useState } from "react";
import {toast} from 'react-toastify'
import {useDispatch} from "react-redux";
import "react-toastify/dist/ReactToastify.css"
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const formLogintHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    dispatch(loginUser({email, password}));
  };

  return (
    <div id="Login" className="tab-pane fade show active" role="tabpanel" aria-labelledby="Login-tab">
      <div className="row">
          <div className="col-lg-6">
              <div className="p-5">
                  <div className="text-center">
                      <h4 className="text-dark mb-4">Bienvenue !</h4>
                  </div>
                    <form className="user" onSubmit={formLogintHandler}>
                      <div className="mb-3">
                        <input className="form-control form-control-user" 
                                type="email" 
                                id="email"  
                                placeholder='Votre Email :'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                />
                      </div>
                      <div className="mb-3">
                        <input className="form-control form-control-user" 
                                type="password" 
                                id="password"  
                                placeholder='Votre Mot de Pass :'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                />
                      </div>
                      <div className="mb-3">
                        <div className="row">
                            <Button id="btn_connect" text="Se connecter">
                                <FaSignInAlt />
                            </Button>
                            <Button id="Log_google" text="Continuer Avec Google">
                                <FaGofore />
                            </Button>
                        </div>
                      </div>
                    <hr/>
                  </form>
                  <Linkbtn text="Mot de Pass Oublier?" link="/Forgot-Password"/>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex">
                <div className="flex-grow-1 bg-login-image"></div>
            </div>
      </div>
    </div>
  
  )
}

export default Login
import React, { useEffect, useState } from 'react'
import logo from '../../image/logo_quiz2.png';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleClasse } from '../../redux/apiCalls/classeApiCall';
import { ToastContainer, toast } from 'react-toastify';
import { subscrib } from '../../redux/apiCalls/inscriptionApiCall';
import '../../style/Style.css'
import {Button, Linkbtn} from "../LogSignItems/components"
import {FaGofore, FaSignInAlt} from 'react-icons/fa'
import {Footer} from '../HomeItems/items'
import { loginSubscrib } from '../../redux/apiCalls/authApiCall';
import Loader from './Loader';


const Subscrib = () => {
      /*
import Loader from './Loader';
        const [loading, setLoading] = useState(true);
  useEffect(()=>{
          setTimeout(() => {
            dispatch(getStudents(idClasse));
            window.scrollTo(0, 0);
            setLoading(false);
          }, 1000);

           <>
    {loading ? (
        <Loader />
      ) : (
        */
    const [loading, setLoading] = useState(true);
    const {idClasse} = useParams();
    const dispatch = useDispatch();

    const {classe} = useSelector(state => state.classe);

    useEffect(()=>{
        setTimeout(() => {
            dispatch(getSingleClasse(idClasse));
            setLoading(false);
          }, 1000);
    },[idClasse]);

    const {user} = useSelector(state => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e)=>{
        e.preventDefault();
        if(email.trim() === "") return toast.error("Email Obligatoire");
        if(password.trim() === "") return toast.error("Mot de passe Obligatoire");
        dispatch(loginSubscrib({email,password}));
    }

    const handleInscription = (e)=>{
        e.preventDefault();
        dispatch(subscrib(idClasse,{etudiant : user._id}));
    }

  return (
   <>{loading ? (
    <Loader />
  ) : (<>
   <div className="container-fluid d-flex justify-content-center p-3 shadow">
        <img src={logo} className="logo_quiz" alt="quiz ai" width="150px"  height="70px"/>
    </div>
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
        {user?.role ==="etudiant" ? (
        <div className="container mt-5 d-flex justify-content-center bg-light-gradient">
            <div className="card shadow" style={{"width":"400px"}}>
                <img className="card-img-top" src={classe?.image.url} alt="Card classe" style={{"width":"100%"}}/>
                    <div className="card-body">
                        <h4 className="card-title mt-2 text-capitalize">{classe?.titre}</h4>
                        <p className="card-text mt-2 text-capitalize">Professeur {classe?.prof.firstname+' '+classe?.prof.lastname}</p>
                        <form onSubmit={handleInscription}>
                            <button  className="btn btn-primary w-100 mt-3" type='submit'>S'inscrire</button>
                        </form>
                    </div>
            </div>
        </div>):(
        <div className="container shadow mt-5">
            <div className="row">
            <div className="col-lg-6">
              <div className="p-5">
                  <div className="text-center">
                      <h4 className="text-dark mb-4 text-capitalize">se connecter pour S'inscrire dans la classe</h4>
                  </div>
                    <form className="user" onSubmit={handleLogin}>
                      <div className="mb-3">
                        <input className="form-control form-control-user" 
                                type="email" 
                                id="email"  
                                placeholder='Votre Email :'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                />
                      </div>
                      <div className="mb-3">
                        <input className="form-control form-control-user" 
                                type="password" 
                                id="password"  
                                placeholder='Votre Mot de Pass :'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
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
                  <Linkbtn text="Mot de Pass Oublier?" link="/compeoublie"/>
              </div>
            </div>
                <div className="col-lg-6 d-none d-lg-flex">
                    <div className="flex-grow-1 bg-login-image"></div>
                </div>

            </div>
            

        </div>)}
        <Footer/>
  </>)}</>
  );
}

export default Subscrib
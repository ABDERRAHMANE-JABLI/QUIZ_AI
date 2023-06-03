import {Button} from "./components"
import {FaGofore, FaSignInAlt} from 'react-icons/fa'
import { useState } from "react"
import {Link} from 'react-router-dom'
import { useDispatch, useSelector} from "react-redux"
import { Registre } from "../../redux/apiCalls/authApiCall"
import swal from 'sweetalert';
import {toast} from 'react-toastify'

const Signin = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmailregistre] = useState("");
  const [tel, setTelregistre] = useState("");
  const [password, setPassregistre] = useState("");
  const [password_repeat, setpassword_repeat] = useState("");
  const [error, setError] = useState(false);
  const [role, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const dispatch = useDispatch();
  const {registreMsg} = useSelector(state => state.auth);
  const formRegister = (e) => {
    e.preventDefault();
    if (firstname.trim() === "") return toast.error("Le Nom est Obligatoire");
    if (lastname.trim() === "") return toast.error("Le Prénom est Obligatoire");
    if (email.trim() === "") return toast.error("L'Email est Obligatoire");
    if (tel.trim() === "") return toast.error("Le N° du Tel est Obligatoire");
    if (password.trim() === "") return toast.error("Le Mot de Pass est Obligatoire");
    if (role.trim() === "") return toast.error("selectionnez le type de votre compte");
    if (password.trim() !== password_repeat.trim()) {
        setError(true); // Set the error state to true if passwords don't match
        return;
      }
      dispatch(Registre({firstname,lastname,email,tel, password,role}));

   
  };

  if(registreMsg){
    swal({
        title:registreMsg,
        icon:"success"
    }).then(isOk => {
        if(isOk){
            // window.location.href = '/Auth'
        }
    })
  }

  return (
    <div id="Signin" className="tab-pane fade show" role="tabpanel" aria-labelledby="Signin-tab">
      <div className="row">
            <div className="col-lg-5 d-none d-lg-flex">
                <div className="flex-grow-1 bg-sigin-image"></div>
            </div>
          <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                    <h4 className="text-dark mb-4">S'inscrire !</h4>
                </div>
                    <form className="user" onSubmit={formRegister}>
                        <div className="row">
                            <div className="col-sm-6 mb-3">
                                <input className="form-control form-control-user" 
                                        type="text"  
                                        placeholder="Votre Nom : "
                                        onChange={(e) => setFirstname(e.target.value)}
                                        value={firstname} 
                                        required
                                />
                            </div>
                            <div className="col-sm-6 mb-3">
                                <input className="form-control form-control-user" 
                                        type="text"  
                                        placeholder="Votre Prénom : "
                                        onChange={(e) => setlastname(e.target.value)}
                                        value={lastname} 
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                                <input className="form-control form-control-user" 
                                        type="email"  
                                        placeholder="Votre Email : "
                                        onChange={(e) => setEmailregistre(e.target.value)}
                                        value={email}
                                />
                        </div>
                        <div className="mb-3">
                                <input className="form-control form-control-user" 
                                        type="tel"  
                                        placeholder="Votre Teléphone : " 
                                        onChange={(e) => setTelregistre(e.target.value)}
                                        value={tel} 
                                />
                        </div>
                        <div className="mb-3">
                                <input className={error ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'} 
                                        type="password"  
                                        placeholder="Votre mot de Pass : "
                                        onChange={(e) => setPassregistre(e.target.value)}
                                        value={password} 
                                />
                        </div>
                        <div className="mb-3">
                                <input className={error ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
                                        id="password_repeat"
                                        type="password"  
                                        placeholder="Confirmez Votre mot de Pass : " 
                                        onChange={(e) => { 
                                            setpassword_repeat(e.target.value); 
                                            setError(false);
                                        }
                                        }
                                        value={password_repeat} 
                                />
                                <div className="invalid-feedback"> 
                                        les deux mots de passe ne sont pas identique
                                </div>
                        </div>
                        <div className="mb-3 d-flex justify-content-around">
                        <div class="form-check form-check-inline">
                            
                            <label class="form-check-label" for="inlineRadio1">Vous etes ?</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" 
                                    type="radio" 
                                    name="inlineRadioOptions" 
                                    id="inlineRadio1" 
                                    value="prof"
                                    // checked={role === 'prof'}
                                    onChange={handleOptionChange}
                                />
                            <label class="form-check-label" for="inlineRadio1">Professeur</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" 
                                    type="radio" 
                                    name="inlineRadioOptions" 
                                    id="inlineRadio2" 
                                    value="etudiant"
                                    // checked={role === 'etudiant'}
                                    onChange={handleOptionChange}/>
                            <label class="form-check-label" for="inlineRadio2">Etudiant</label>
                        </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <Button id="btn_inscrire" text="S'inscrire">
                                    <FaSignInAlt />
                                </Button>
                                <Button id="Signin_google" text="Continuer Avec Google">
                                    <FaGofore />
                                </Button>
                            </div>
                        </div>
                        <hr/>
                    </form>
                    <div className="text-center">
                        Vous possédez un Compte ? <Link to="/auth">Se connecter</Link> 
                    </div>
                </div>
            </div>
            
      </div>
    </div>
  
  )
}

export default Signin
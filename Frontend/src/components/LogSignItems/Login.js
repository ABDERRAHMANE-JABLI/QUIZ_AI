import {Input, Button, Linkbtn} from "./components"
import {FaGofore, FaSignInAlt} from 'react-icons/fa'


const Login = () => {
  return (
    <div id="Login" className="tab-pane fade show active" role="tabpanel" aria-labelledby="Login-tab">
      <div className="row">
          <div className="col-lg-6">
              <div className="p-5">
                  <div className="text-center">
                      <h4 className="text-dark mb-4">Bienvenue !</h4>
                  </div>
                    <form className="user" id="frm_login" action="login">
                      <Input id='email' placeholder='Votre Email :' type='email' />
                      <Input id='password' placeholder='Votre Mot de Pass :' type='password' />
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
                  <Linkbtn text="Créer un Compte" link="/"/>
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
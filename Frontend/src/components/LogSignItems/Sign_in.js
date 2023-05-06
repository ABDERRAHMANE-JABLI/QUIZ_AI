import {Input, Button, Linkbtn} from "./components"
import {FaGofore, FaSignInAlt} from 'react-icons/fa'

const Signin = () => {
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
                    <form className="user" id="frm_Signin" action="Signin">
                        <div className="row">
                            <div className="col-sm-6"><Input id='nom' placeholder='Votre nom :' type='text' /></div>
                            <div className="col-sm-6"><Input id='prenom' placeholder='Votre prenom :' type='text' /></div>
                        </div>
                        <Input id='Tel' placeholder='Votre Teléphone :' type='tel' />
                        <Input id='useremail' placeholder='Votre Email :' type='email' />
                        <Input id='userpass1' placeholder='Votre Mot de Pass :' type='password' />
                        <Input id='userpass2' placeholder='Repéter Le Mot de Pass :' type='password' />
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
                    <Linkbtn text="déja un Compte?" link="/seconnecter"/>
                </div>
            </div>
            
      </div>
    </div>
  
  )
}

export default Signin
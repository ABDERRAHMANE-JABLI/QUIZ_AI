import Input from './Input';
import {FaSave} from 'react-icons/fa'

const UserSettings = () => {
  return (
    <div className="col mt-3">
        <div className="card shadow mb-3">
            <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">Paramètres d'Utilisateurs</p>
            </div>
            <div className="card-body">
                <form action="/" id="profile_settings">
                    <div className="row">
                        <Input id="Nom" label="Nom Utilisateur" placeholder="Tapez Votre Nom" type="text"/>
                        <Input id="Prenom" label="Prénom" placeholder="Tapez Votre Prénom" type="text"/>
                        <Input id="Email" label="Email" placeholder="Tapez Votre Email" type="email"/>
                        <Input id="Tél" label="Télephone" placeholder=" Votre Tel 06xxxxxxxx" type="tel"/>
                    </div>
                    <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit"><FaSave/>&nbsp;Enregistrer</button></div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default UserSettings
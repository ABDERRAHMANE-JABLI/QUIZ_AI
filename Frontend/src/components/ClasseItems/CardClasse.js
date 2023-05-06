import {FaEllipsisV} from 'react-icons/fa';
import Img_Class from '../../image/Classe_default.png';

const CardClasse = (props) => {
 return (
    <div className="col-md-4 col-xl-3">
        <div className="card shadow mb-4">
            <div className="d-flex flex-row justify-content-between p-2">
                <h5 className="d-flex">{props.Title}</h5>
                <div className="d-flex dropdown">
                    <button id="dropdownMenuButton-6" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{"backgroundColor": "white","border": "none"}}><FaEllipsisV/></button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href={`/Invitation?classe=${props.id}`}>Copier Lien d'invitation</a></li>
                        <li><a className="dropdown-item" href="/">Personnaliser</a></li>
                        <li><a className="dropdown-item" href="/">Supprimer</a></li>
                    </ul>
                </div>
            </div>
            <div style={{'height': '150px'}}>    
                <img src={props.img === "" ? Img_Class : props.img} width="100%" height="150px" alt="card classe"/>
            </div>
            <div className="card-body">
                <p className="card-text text-truncate">{props.Description}</p>
                <a className="btn btn-outline-primary" role="button" href={`/Classe?id=${props.id}`}>Voir plus</a>
            </div>
        </div>
    </div>
  )
}

export default CardClasse
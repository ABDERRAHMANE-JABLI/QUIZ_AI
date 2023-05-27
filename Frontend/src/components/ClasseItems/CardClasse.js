import { useDispatch } from 'react-redux';
import { delete_Classe } from '../../redux/apiCalls/classeApiCall';
import {FaEllipsisV} from 'react-icons/fa';
import swal from 'sweetalert'
import { toast } from 'react-toastify';

const CardClasse = (props) => {
    const dispatch = useDispatch();

    const deleteClasse = () =>{
        swal({
            title: 'Vous étes sur?',
            text: "Vous voulez Supprimer cette classe",
            icon: 'warning',
            buttons: true,
            dangerMode: true
          }).then((ok) => {
            if (ok) {
                dispatch(delete_Classe(props.id));
            }
          });
    }

    const storeIdClasse = ()=>{
        localStorage.setItem("idClasse", props.id);
    }
/*swal({ title: 'Vous étes sur?', text: "Vous voulez Supprimer cette classe", icon: 'warning', buttons: true, dangerMode: true }).then((ok) => { if (ok) {dispatch(delete_Classe(props.id)); }});

*/
    //<span style={{"display":"none"}}>{`http://localhost:3000/Invitation/${props.id}`}</span>
 return (
    <div className="col-md-4 col-xl-3">
        <div className="card shadow mb-4">
            <div className="d-flex flex-row justify-content-between p-2">
                <h5 className="d-flex text-capitalize">{props.Title}</h5>
                <div className="d-flex dropdown">
                    <button id="dropdownMenuButton-6" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{"backgroundColor": "white","border": "none"}}>
                        <FaEllipsisV/>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button className="dropdown-item" type='button' onClick={()=>{navigator.clipboard.writeText(`http://localhost:3000/Inviter/${props.id}`);     toast.info("Lien d'invitation copié", {position: "top-center",autoClose: 1000,hideProgressBar: true,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,theme: "light",});}}>Copier Lien d'invitation</button></li>
                        <li><a className="dropdown-item" href="/">Editer</a></li>
                        <li><span className="dropdown-item spn" onClick={deleteClasse}>Supprimer</span></li>
                    </ul>
                </div>
            </div>
            <div style={{'height': '150px'}}>    
                <img src={props.img} width="100%" height="150px" alt="card classe"/>
            </div>
            <div className="card-body">
                <p className="card-text text-truncate">{props.Description}</p>
                <a className="btn btn-outline-primary" role="button" href={`/Classes/${props.id}/Students`} onClick={storeIdClasse}>Voir plus</a>
            </div>
        </div>
    </div>
  )
}

export default CardClasse
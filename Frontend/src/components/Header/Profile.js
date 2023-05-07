//import user_img from '../../image/user_img.png'
import {FaUserCircle, FaCogs, FaSignOutAlt} from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/apiCalls/authApiCall';

const Profile = (props) => {
  const dispatch = useDispatch();
  return (
    <li className="nav-item dropdown no-arrow">
        <div className="nav-item dropdown no-arrow">
            <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="/profile">
                <span className="d-none d-lg-inline me-2 text-gray-600 small">{props.username}</span>
                <img className="rounded-circle border img-profile" src={props.profile} width="32" height="32" alt={`Profile ${props.username}`}/>
            </a>
            <div className="shadow dropdown-menu dropdown-menu-end animated--grow-in">
                <a className="dropdown-item" href={`/profile/${props.id}`}><span className='me-2 text-gray-800'><FaUserCircle/></span>&nbsp;Profile</a>
                <a className="dropdown-item" href={`/profile/${props.id}`}><span className='me-2 text-gray-800'><FaCogs/></span>&nbsp;Paramètres</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" onClick={()=>dispatch(logoutUser())}><span className='me-2 text-gray-800'><FaSignOutAlt/></span>&nbsp;Se Déconnecter</a>
            </div>
        </div>
    </li>
  );
}

export default Profile
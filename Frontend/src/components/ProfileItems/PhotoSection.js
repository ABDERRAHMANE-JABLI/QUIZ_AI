import photo from '../../image/user_img.png'
import {FaSave} from 'react-icons/fa'
import { useSelector } from 'react-redux';

const PhotoSection = () => {
  const {user} = useSelector(state=>state.auth);
  return (
    <div className="col-12">
        <div className="card mb-3">
            <div className="card-body text-center shadow">
                <img className="rounded-circle mb-3 mt-4" src={user?.photo.url} width="160" height="160" alt="user profile"/>
                <div className="mb-3"><button className="btn btn-warning btn-md" type="button"><FaSave/>&nbsp;Changer La Photo</button></div>
            </div>
        </div>
    </div>
  )
}

export default PhotoSection
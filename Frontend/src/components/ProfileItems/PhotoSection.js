import photo from '../../image/user_img.png'
import {FaSave} from 'react-icons/fa'
const PhotoSection = (props) => {
  return (
    <div className="col-12">
        <div className="card mb-3">
            <div className="card-body text-center shadow">
                <img className="rounded-circle mb-3 mt-4" src={props.photo === "" ? photo : props.photo} width="160" height="160" alt="user profile"/>
                <div className="mb-3"><button className="btn btn-warning btn-md" type="button"><FaSave/>&nbsp;Changer La Photo</button></div>
            </div>
        </div>
    </div>
  )
}

export default PhotoSection
import photo from '../../image/user_img.png'
import {FaSave} from 'react-icons/fa'
import { useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserProfile } from '../../redux/apiCalls/profileApiCall';

const PhotoSection = () => {

  const dispatch = useDispatch();
  const {profile} = useSelector(state=>state.profil);
  const {id} = useParams();
  useEffect(() => {
    dispatch(GetUserProfile(id));
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="col-12">
        <div className="card mb-3">
            <div className="card-body text-center shadow">
                <img className="rounded-circle mb-3 mt-4" src={profile.photo.url} width="160" height="160" alt="user profile"/>
                <div className="mb-3"><button className="btn btn-warning btn-md" type="button"><FaSave/>&nbsp;Changer La Photo</button></div>
            </div>
        </div>
    </div>
  )
}

export default PhotoSection
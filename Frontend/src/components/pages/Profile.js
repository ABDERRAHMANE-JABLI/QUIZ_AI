/**import UserSettings from '../ProfileItems/UserSettings'
import PhotoSection from '../ProfileItems/PhotoSection'*/
import {Sidebar, Footer, Header, Container} from '../components';
import { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserProfile, updatePhoto } from '../../redux/apiCalls/profileApiCall';
import {FaSave, FaCamera} from 'react-icons/fa'
import {toast, ToastContainer} from 'react-toastify'
import '../../style/profile.css'

const Profile = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmailregistre] = useState("");
  const [tel, setTelregistre] = useState("");
  const [file, setFile] = useState(null);
  
  const {profile} = useSelector(state => state.profile);
  
  const {id} = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUserProfile(id));
    window.scrollTo(0, 0);
  }, [id]);

  const updatPhotoHandler = (e) => {
    e.preventDefault();
    if(!file) return toast.warning("Veuillez insérer ta photo");

    const frm_data = new FormData();
    frm_data.append("image", file);
    dispatch(updatePhoto(frm_data));
  }

  return (
    <div id="wrapper">
      <Sidebar/>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Header/>
          <ToastContainer
                      position="top-center"
                      autoClose={2500}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored"
                      />
          <Container>
            {/** Gegin photo section : ********************************************************** */}
            <div className="col-12">
              <div className="card mb-3 d-flex bg-light flex-column justify-content-center align-items-center">
                  <div className="card-body bg-light text-center">
                  <div className=" d-flex profile-image-wrapper bg-light">
                    <img src={file ? URL.createObjectURL(file) : profile?.photo.url} alt="" className="profile-image" />
                    <form onSubmit={updatPhotoHandler}>
                    <abbr title="choose profile photo">
                      <label
                        htmlFor="file"
                        className="upload-profile-photo-icon"
                      ><FaCamera/></label>
                    </abbr>
                      <input
                        type="file"
                        id="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={e => setFile(e.target.files[0])}
                      />
                      <button type="submit" className="upload-profile-photo-btn">Modifier</button>
                    </form>
                  </div>
                    {/**<div className="mb-3"><button className="btn btn-warning btn-md" type="button"><FaSave/>&nbsp;Changer La Photo</button></div>*/}
                  </div>
              </div>
            </div>
            {/** End photo section : ********************************************************** */}
            
            {/** Begin user info ***************************************************************************** */}
            <div className="col mt-3">
                <div className="card shadow mb-3">
                    <div className="card-header py-3">
                      <p className="text-primary m-0 fw-bold">Paramètres d'Utilisateurs</p>
                    </div>
                    <div className="card-body">
                      <form action="/" id="profile_settings">
                          <div className="row">
                              <div className="col-sm-6 mb-3">
                                <label className="form-label" htmlFor='nom'><strong>Nom</strong></label>
                                <input className="form-control" 
                                        type="text"  
                                        id='nom'
                                        placeholder="Votre Nom : "
                                        onChange={(e) => setFirstname(e.target.value)}
                                        value={firstname} 
                                />
                              </div>  
                              <div className="col-sm-6 mb-3">
                                  <label className="form-label" htmlFor='prenom'><strong>PréNom</strong></label>
                                  <input className="form-control" 
                                        type="text" 
                                        id="prenom" 
                                        placeholder="Votre Prénom : "
                                        onChange={(e) => setlastname(e.target.value)}
                                        value={lastname} 
                                  />
                              </div>
                              <div className="mb-3">
                                <label className="form-label" htmlFor='prenom'><strong>Email</strong></label>
                                <input className="form-control" 
                                        type="email"
                                        id="mail"  
                                        placeholder="Votre Email : "
                                        onChange={(e) => setEmailregistre(e.target.value)}
                                        value={email}
                                />
                              </div>   
                              <div className="mb-3">
                                <label className="form-label" htmlFor='prenom'><strong>Télephone</strong></label>
                                <input className="form-control form-control-user" 
                                        type="tel"  
                                        id='tel'
                                        placeholder="Votre Teléphone : " 
                                        onChange={(e) => setTelregistre(e.target.value)}
                                        value={tel} 
                                />
                              </div>                       
                          </div>
                          <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit"><FaSave/>&nbsp;Enregistrer</button></div>
                      </form>
                    </div>
                </div>
            </div>
            {/** End user info ********************************************************************************** */}
          </Container>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default Profile
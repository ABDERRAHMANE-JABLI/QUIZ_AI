import UserSettings from '../ProfileItems/UserSettings'
import PhotoSection from '../ProfileItems/PhotoSection'
import {Sidebar, Footer, Header, Container} from '../components';
//import photo from '../../image/user_img.png';

const Profile = () => {
  return (
    <div id="wrapper">
      <Sidebar/>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Header/>
          <Container>
            <PhotoSection/>
            <UserSettings/>
          </Container>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default Profile
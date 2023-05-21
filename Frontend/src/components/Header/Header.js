import React from 'react';
import Notification from './Notification';
import Cadre from './Cadre';
import Message from './Message';
import Profile from './Profile';
import {FaBars, FaSearch, FaBell, FaMailBulk} from 'react-icons/fa';
import { useSelector } from 'react-redux';

function toogleBarre(){
    var side = document.getElementById("side-barre");
    if(side.style.display === "none"){
        side.style.display = "block";
    }
    else{
        side.style.display = "none";
    }
}

const Navbar = () => {
  //state c'est reducer dans store.js
  const {user} = useSelector(state=>state.auth);
 //const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className='navbar navbar-light navbar-expand bg-white shadow mb-4 topbar  static-top'>
      <div className='container-fluid'>
        <button className="btn btn-link rounded-circle me-3" onClick={toogleBarre} type="button">
          <FaBars/>
        </button>
        <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..."/>
            <button className="btn btn-primary py-0" type="button"><FaSearch/></button>
          </div>
        </form>
        <ul className='navbar-nav flex-nowrap'>
            <Cadre titre="Notifications" count="3" icon={<span style={{"fontSize": "20px","color":"rgb(41, 47, 84)"}}><FaBell/></span>}>
              <Notification titre="Lorem ipsum dollar set" date="avril 18, 2023" color="#3045d1"/>
              <Notification titre="Lorem ipsum dollar set" date="avril 13, 2023" color="#d14341"/>
              <Notification titre="Lorem ipsum dollar set" date="avril 8, 2023" color="#0f7e2b"/>
            </Cadre>

            <Cadre titre="Messages" count="6" icon={<span style={{"fontSize": "20px","color":"rgb(41, 47, 84)"}}><FaMailBulk/></span>}>
              <Message msg="Hi there! I am wondering if you can help me with a problem I've been having" transmitter="Jamila Benani" />
              <Message msg="Hi there! I am wondering if you can help me with a problem I've been having" transmitter="Kawtar ben" />
              <Message msg="Hi there! I am wondering if you can help me with a problem I've been having" transmitter="jillali med" />
            </Cadre>
            <div className="d-none d-sm-block topbar-divider"></div>
            <Profile username={`${user?.firstname} ${user?.lastname}`} profile={user?.photo.url} id={user?._id}/>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
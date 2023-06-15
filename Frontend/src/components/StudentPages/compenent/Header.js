import React from 'react';
import Notification from '../../Header/Notification';
import Cadre from '../../Header/Cadre';
import Message from '../../Header/Message';
import Profile from '../../Header/Profile';
import {FaBars, FaSearch, FaBell, FaMailBulk} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import logo from '../../../image/logo_quiz2.png';



const Navbar = () => {
  //state c'est reducer dans store.js
  const {user} = useSelector(state=>state.auth);
 //const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className='navbar navbar-light navbar-expand bg-white shadow mb-4 topbar  static-top'>
      <div className='container-fluid'>
      <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" />

        </a>
        <ul className='navbar-nav flex-nowrap'>
          <li className="nav-item">
            <a className="nav-link" href="/link1">Mes classe</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/link2">Link 2</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/link3">Link 3</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/link4">Link 4</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/link5">Link 5</a>
          </li>
          </ul>
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
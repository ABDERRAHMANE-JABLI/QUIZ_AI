import React from 'react'
import logo from '../../../image/logo_quiz2.png';  
import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
const Header = () => {
  return (
  <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="main-nav">
            <a href="/Auth" className="logo">
              <img src={logo} alt="Logo ai in education" height="60px" width="100px"/>
            </a>

            <ul className="nav">
            
              <li className="scroll-to-section active"><a  >Acceuil</a></li>
              <li className="scroll-to-section"><a >Services</a></li>
              <li className="scroll-to-section"><a >À propos</a></li>
              <li className="scroll-to-section"><a >Tarification</a></li>
            </ul>  
            <a className='menu-trigger'>
                <span>Menu</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header
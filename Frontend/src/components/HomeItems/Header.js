import React from 'react'
import logo from '../../image/logo_quiz2.png';
import { FaSignInAlt } from 'react-icons/fa';
const Header = () => {
  return (
   // <!-- ***** Header Area Start ***** -->
   <>
  <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="main-nav">
            <a href="index.html" className="logo">
              <img src={logo} alt="Logo ai in education" height="60px" width="100px"/>
            </a>

            <ul className="nav">
              <li className="scroll-to-section"><a href="#top" className="active">Acceuil</a></li>
              <li className="scroll-to-section"><a href="#services">Services</a></li>
              <li className="scroll-to-section"><a href="#about">À propos</a></li>
              <li className="scroll-to-section"><a href="#pricing">Tarification</a></li>
              <li><div className="gradient-button"><a id='modal_trigger' href='#modal' data-bs-toggle="modal" data-bs-target="#myModal"><FaSignInAlt/> Utilisez QUIZ-AI</a></div></li> 
            </ul>        
            <a className='menu-trigger'>
                <span>Menu</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </header>
  <div className="modal modal-sm fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Vous étes ?</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body d-flex justify-content-around">
            <a href="/auth" className=" gradient btn " style={{"width":"100px"}}>Professeur</a>
            <a href="/auth/Student" className="gradient btn " style={{"width":"100px"}}>Etudiant</a>
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default Header
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../image/logo_quiz2.png';
import { FaSignInAlt } from 'react-icons/fa';
import Footer from '../HomeItems/footer';
import Header from './compenent/Header';

const MainPage = (props) => {
  // Add your logic here to retrieve student classes or perform other actions

  return (
    <div>
      {/* Navbar */}
       <Header/>

      {/* Content */}
      <div className="container mt-4">
        <h1>Student Classes</h1>
        {/* Add your content here */}
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default MainPage;

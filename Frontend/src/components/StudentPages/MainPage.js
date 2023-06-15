import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../image/logo_quiz2.png';
import { FaSignInAlt } from 'react-icons/fa';
import Footer from '../HomeItems/footer';
import Navbar from './compenent/Header';

const MainPage = (props) => {
  // Add your logic here to retrieve student classes or perform other actions

  return (
  <>
  {/* Navbar */}
<Navbar/>
{/* Content */}
<div className="container mt-4">

  
  {/* Add your content here */}
</div>

{/* Footer */}
<Footer/>
  </>
      

  );
};

export default MainPage;

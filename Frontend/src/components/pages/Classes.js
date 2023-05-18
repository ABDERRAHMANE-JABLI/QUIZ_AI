import React, { useEffect } from 'react'
import {Sidebar, Footer, Header, Container, TitleSection} from '../components';
import CardClasse from '../ClasseItems/CardClasse'
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from '../../redux/apiCalls/classeApiCall';
import { ToastContainer } from 'react-toastify';
/*import {toast} from 'react-toastify'
import axios from "axios"
import { useState } from 'react';*/
const Classes = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getClasses());
  },[]);

  const {classes} = useSelector(state=>state.classe);
                const cards = classes.map(function(item){
                  return <CardClasse key={item._id} id={item._id} Title={item.titre} Description={item.description} img={item.image.url}/>
                });  
                
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
          <TitleSection page="Mes Classes" modalId="exampleModal" modalTitle="ajouter une classe"  modalBody="here some input" description="Ajouter une Nouvelle Classe" btn="Classe"/>
          <Container>
            <div className='row'>
                {cards}
            </div>
          </Container>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default Classes
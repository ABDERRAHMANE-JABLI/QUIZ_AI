import React, { useEffect } from 'react'
import {Sidebar, Footer, Header, Container, TitleSection} from '../components';
import CardClasse from '../ClasseItems/CardClasse'
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from '../../redux/apiCalls/classeApiCall';

const Classes = () => {

  const dispatch = useDispatch();
  const {classes} = useSelector(state=>state.classe);
  useEffect(()=>{
    dispatch(getClasses());
  });
 /* const data = [{id:"1", Title:"APTIC LP TMW", Description:"Module Aptic Lp Technologies Multimedia et du web", img:""},
                {id:"2", Title:"Structure Données", Description:"Langage C Licence d'education s4 ", img:""},
                {id:"3", Title:"Web Statique", Description:"Module Web Statique Licence d'education s4", img:""},
                {id:"4", Title:"Web Dynamique", Description:"Module Web Dynamique Lp Technologies Multimedia et du web", img:""},
                {id:"5", Title:"POO JAVA", Description:"Module Poo java Lp Technologies Multimedia et du web", img:""}
              ];*/
  const data = classes;

  const cards = data.map(function(item){
    return <CardClasse id={item._id} Title={item.titre} Description={item.description} img={item.image.url}/>
  });

  return (
    <div id="wrapper">
      <Sidebar/>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Header/>
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
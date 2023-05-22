import React from 'react'
import imgLine from '../../image/heading-line-dec.png'
import imgAbout from '../../image/imgAbout.png'

const aboutSection = () => {

  return (
    <div id="about" className="about-us section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 align-self-center">
          <div className="section-heading">
            <h4>À Propos De <em>QUIZ-AI</em></h4>
            <img src={imgLine} alt=""/>
            <p>QUIZ-AI Un Outil Puissant et Facile à Utiliser pour Evaluer Les Etudiants en toute Simplicité.</p>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">Géneration Des Examens</a></h4>
                <p>Seulement avec une Description</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">Rendre l'apprentissage divertissant et interactif</a></h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">Visualisez Les Résultats et Suivre l'évolution des vos Etudiants</a></h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">24/7 Support &amp; Help</a></h4>
                <p>Nous Contactez Si il'ya des Problèmes</p>
              </div>
            </div>
            <div className="col-lg-12">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eismod tempor idunte ut labore et dolore adipiscing  magna.</p>
              <div className="gradient-button">
                <a href="#">Plan Universitaire</a>
              </div>
              <span>*No Credit Card Required</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="right-image">
            <img src={imgAbout} alt="image dashborad"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default aboutSection
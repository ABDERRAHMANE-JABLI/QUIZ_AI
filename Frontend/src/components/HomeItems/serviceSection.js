import React from 'react'
import imgLine from '../../image/heading-line-dec.png'

const serviceSection = () => {

  return (
  <div id="services" className="services section">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="section-heading  wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
            <h4>Incroyable <em>Services &amp; Fonctionnalités</em> pour Vous</h4>
            <img src={imgLine} alt="line heading image"/>
            <p>Que vous soyez un Professeur ou un étudiant en Informatique, en Science, en Mathématiques, en Littérature ou dans n'importe quel autre domaine, notre Application QUIZ-AI est là pour Vous Stasfaire dans votre Travail et votre Enseignement </p>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <div className="service-item first-service">
            <div className="icon"></div>
            <h4>Créer et Personnaliser</h4>
            <p>Génerer votre Examens Avec une petite description et quelque clics</p>
            <div className="text-button">
              <a href="#">Voir plus <i className="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="service-item second-service">
            <div className="icon"></div>
            <h4>Inclure & Engager</h4>
            <p>Engagez les étudiants de manière flexible à leur propre rythme, depuis n'importe quel appareil</p>
            <div className="text-button">
              <a href="#">Voir plus <i className="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="service-item third-service">
            <div className="icon"></div>
            <h4>Obtenir des données</h4>
            <p>Voir les performances globales de la classNamee, la question ou le sujet le plus difficile et les progrès individuels </p>
            <div className="text-button">
              <a href="#">Voir plus <i className="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="service-item fourth-service">
            <div className="icon"></div>
            <h4>24/7 Help &amp; Support</h4>
            <p>Nous Sommes disponibles 24h/24 et 7j/7 <a href="mailto:Quiz.AI.contact@gmail.com">Nous-contactez</a> Si vous Rencontrez des problémes.</p>
            <div className="text-button">
              <a href="#">Voir plus <i className="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default serviceSection
import React from 'react'
import imgLine from '../../image/heading-line-dec.png'
import quote from '../../image/quote.png'

const Testimonials = () => {

  return (
    <div id="clients" className="the-clients">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="section-heading">
            <h4>Approuvé Par <em>Les Enseignants</em></h4>
            <img src={imgLine} alt="line heading image"/>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="naccs">
            <div className="grid">
              <div className="row">
                <div className="col-lg-7 align-self-center">
                  <div className="menu">
                    <div className="first-thumb active">
                      <div className="thumb">
                        <div className="row">
                          <div className="col-lg-4 col-sm-4 col-12">
                            <h4>David Mohammed</h4>
                            <span className="date">20 Avril 2023</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                            <span className="category">Prof d'Anglais</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 col-12">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <span className="rating">4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="thumb">
                        <div className="row">
                          <div className="col-lg-4 col-sm-4 col-12">
                            <h4>jillali Harris</h4>
                            <span className="date">01 Mai 2023</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                            <span className="category">Formateur Dev WEB</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 col-12">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <span className="rating">4.5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="thumb">
                        <div className="row">
                          <div className="col-lg-4 col-sm-4 col-12">
                            <h4>Catherina Khadija</h4>
                            <span className="date">27 Avril 2023</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                            <span className="category">Prof d'Economie</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 col-12">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <span className="rating">4.7</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="last-thumb">
                      <div className="thumb">
                        <div className="row">
                          <div className="col-lg-4 col-sm-4 col-12">
                            <h4>Mark Amber Do</h4>
                            <span className="date">21 November 2021</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                            <span className="category">Web Development</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 col-12">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <span className="rating">4.3</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                <div className="col-lg-5">
                  <ul className="nacc">
                    <li className="active">
                      <div>
                        <div className="thumb">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="client-content">
                                <img src={quote} alt="quote"/>
                                <p>“Un Grand Merci Pour Tous ce qui Rend ce travail "QUIZ-AI" possible ”</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="thumb">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="client-content">
                                <img src={quote} alt="quote"/>
                                <p>“Meilleure application, testez QUIZ-AI et vous ne serez pas regreter”</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="thumb">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="client-content">
                                <img src={quote} alt="quote"/>
                                <p>“Un Grand Merci Pour Tous ce qui Rend ce travail "QUIZ-AI" possible ”</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="thumb">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="client-content">
                                <img src={quote} alt="quote"/>
                                <p>“Un Grand Merci Pour Tous L'équipe de "QUIZ-AI" Bonne continuation ”</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>          
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Testimonials
import React from 'react'
import '../../style/owl.css'
import '../../style/home.css'
import {About, Footer, Header, Mainbanner, Pricing, Services, Testimonials} from '../HomeItems/items'

const Home = () => {
  return (
    <>
        <div id="js-preloader" className="js-preloader">
            <div className="preloader-inner">
                <span className="dot"></span>
                <div className="dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            </div>
        </div>

        <Header/>
        <div id="modal" className="popupContainer" style={{"display":"none"}}>
            <div className="popupHeader">
                <span className="header_title">Bienvenue</span>
                <span className="modal_close"><i className="fa fa-times"></i></span>
            </div>
            <section className="popupBody">
                <div className="centeredText">
                    <span>Vous étes ?</span>
                </div>
                <div className="action_btns">
                    <div className="one_half"><a href="/Auth" className="btn">Professeur</a></div>
                    <div className="one_half last"><a href="/Auth" className="btn">Etudiant(e)</a></div>
                </div>
            </section>
        </div>
        <Mainbanner/>
        <Services/>
        <About/>
        <Testimonials/>
        <Pricing/>
        <Footer/>
    </>
  )
}
export default Home
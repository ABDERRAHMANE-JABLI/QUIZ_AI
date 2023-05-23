import React,{useEffect, useState} from 'react'
import '../../style/owl.css'
import '../../style/home.css'
import {About, Footer, Header, Mainbanner, Pricing, Services, Testimonials} from '../HomeItems/items'
import Loader from './Loader';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      },[]);

  return (
    <>
        {loading ? (
        <Loader />
      ) : (<>
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
        <Footer/></>
      )}</>
  )
}
export default Home
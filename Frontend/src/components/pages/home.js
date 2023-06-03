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
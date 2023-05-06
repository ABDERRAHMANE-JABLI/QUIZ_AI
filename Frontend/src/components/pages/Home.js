import React from 'react'
import {Sidebar, Footer, Header, Container, TitleSection} from '../components';
import {FaUserGraduate, FaSchool, FaBook, FaDollarSign} from 'react-icons/fa';

import Barre from '../HomeItems/Barre'
import Linechart from '../HomeItems/Line';
import HomeCard from '../HomeItems/HomeCard';
const Home = () => {
    const data = [
                {annee:"2017",Nbr_Etudiants:105},
                {annee:"2018",Nbr_Etudiants:120},
                {annee:"2019",Nbr_Etudiants:65},
                {annee:"2020",Nbr_Etudiants:55},
                {annee:"2021",Nbr_Etudiants:85}
            ];
    const data_line =  [
        {
          "name": "Page A",
          "uv": 4000,
          "pv": 2400,
          "amt": 2400
        },
        {
          "name": "Page B",
          "uv": 3000,
          "pv": 1398,
          "amt": 2210
        },{
            "name": "Page C",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
          },{
            "name": "Page D",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
          }
        ];

  return (
    <div id="wrapper">
      <Sidebar/>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Header/>
          <TitleSection page="Dashboard" modal="#" description="Genérer Les Rapports" btn="Reports"/>
          <Container>
            <div className='row'>
            <HomeCard titre="Nbr Etudiants" val="120" color="#1f8316">
                <FaUserGraduate/>
            </HomeCard>
            <HomeCard titre="Nbr Classes" val="5" color="#054dd3">
                <FaSchool/>
            </HomeCard>
            <HomeCard titre="Nbr EXamens" val="10" color="#eb5b13">
                <FaBook/>
            </HomeCard>
            <HomeCard titre="Solde OpenAI" val="15$" color="#bec106">
            <FaDollarSign/>
            </HomeCard>
                <Barre data={data}/>
                <Linechart data={data_line}/>
                </div>
          </Container>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
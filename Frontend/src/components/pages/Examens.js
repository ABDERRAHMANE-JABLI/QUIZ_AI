import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {Sidebar, Footer, Header, Container } from '../components';
import NavigationStduentClasses from '../ClassDetails/NavigationStduentClasses' ;
import ExamenCards from '../ClassDetails/ExamenCards';
import ModalIjouterExamen from '../ClassDetails/ModalAjouterExame';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';


const Examens = () => {
    const { idClasse } = useParams();
    const [examensData, setExamensData] = useState([]);
  
    useEffect(() => {
      fetchExamensData();
    }, []);
  
    const fetchExamensData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/examens/${idClasse}/examens`);
        const data = await response.json();
        setExamensData(data);
      } catch (error) {
        console.log('Error fetching examens data:', error);
      }
    };
  
    const cardExamns = examensData.map((item) => (
      <ExamenCards
        key={item.id}
        id={item.id}
        titre={item.titre}
        NbQuestion={item.NbQuestion}
        description={item.description}
        Date_debut={item.Date_debut}
        duree={item.Durre}
      />
    ));
 
  return (
    <div id="wrapper">
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
      <Sidebar/>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
         <ModalIjouterExamen/>
          <Header/>
          <NavigationStduentClasses/>
          <Container>
            
            <div className="card shadow">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">
                        Quiz
                        <button
                            className="btn btn-outline-success float-end"
                            data-bs-toggle="modal"
                            data-bs-target={'#Add-Examen'}
                            // data-bs-keyboard={"false"} 
                            // data-bs-backdrop={"static"}
                        >
                            <FaPlus/>
                            &nbsp; &nbsp;Ajouter
                        </button>
                        </p>
                    </div>
                    <div className="card-body">
                        <div className="row">
                        <div className="col-md-6 text-nowrap">
                            <div
                            id="dataTable_length"
                            className="dataTables_length"
                            aria-controls="dataTable"
                            >
                            <label className="form-label">
                                Show&nbsp;
                                <select className="d-inline-block form-select form-select-sm">
                                <option value={10} selected="">
                                    10
                                </option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                </select>
                            </label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div id="dataTable_filter" className="text-md-end dataTables_filter">
                            <label className="form-label">
                                <input
                                className="form-control form-control-sm"
                                type="search"
                                aria-controls="dataTable"
                                placeholder="Search"
                                />
                            </label>
                            </div>
                        </div>
                        </div>
                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {cardExamns.length > 0 ? (
                                // Render the exams
                                cardExamns
                            ) : (
                                // Render a message when there are no exams
                                <p style={{ textAlign: 'center' }}>No data available</p>
                            )}
                            </div>

                        <div className="row">
                        <div className="col-md-6 align-self-center">
                            <p
                            id="dataTable_info"
                            className="dataTables_info"
                            role="status"
                            aria-live="polite"
                            >
                            Showing 1 to 10 of 27
                            </p>
                        </div>
                        <div className="col-md-6">
                            <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                            <ul className="pagination">
                                <li className="page-item disabled">
                                <a className="page-link" aria-label="Previous" href="#">
                                    <span aria-hidden="true">«</span>
                                </a>
                                </li>
                                <li className="page-item active">
                                <a className="page-link" href="#">
                                    1
                                </a>
                                </li>
                                <li className="page-item">
                                <a className="page-link" href="#">
                                    2
                                </a>
                                </li>
                                <li className="page-item">
                                <a className="page-link" href="#">
                                    3
                                </a>
                                </li>
                                <li className="page-item">
                                <a className="page-link" aria-label="Next" href="#">
                                    <span aria-hidden="true">»</span>
                                </a>
                                </li>
                            </ul>
                            </nav>
                        </div>
                        </div>
                    </div>
                    </div>

          </Container>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default Examens
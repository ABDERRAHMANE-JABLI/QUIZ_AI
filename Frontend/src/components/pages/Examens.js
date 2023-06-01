import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sidebar, Footer, Header, Container } from '../components';
import NavigationStduentClasses from '../ClassDetails/NavigationStduentClasses';
import ExamenCards from '../ClassDetails/ExamenCards';
import ModalIjouterExamen from '../ClassDetails/ModalAjouterExame';
import Breadcrumb from '../ClassDetails/Broadcrumb';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';

const Examens = () => {
  const { idClasse } = useParams();
  const [examensData, setExamensData] = useState([]);
  const [pageSize, setPageSize] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset current page when page size changes
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };

  const filteredExamensData = examensData.filter((item) =>
    item.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredExamensData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedExamensData = filteredExamensData.slice(startIndex, endIndex);

  const cardExamens = paginatedExamensData.map((item) => (
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" aria-label="Previous" href="#" onClick={() => handlePageChange(currentPage - 1)}>
              <span aria-hidden="true">«</span>
            </a>
          </li>
          {pages.map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <a className="page-link" href="#" onClick={() => handlePageChange(page)}>
                {page}
              </a>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a className="page-link" aria-label="Next" href="#" onClick={() => handlePageChange(currentPage + 1)}>
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  };

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
      <Sidebar />
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <ModalIjouterExamen />
          <Header />

          <Container>
          <Breadcrumb idClasse={idClasse} />

            <NavigationStduentClasses />


            <div className="card shadow">
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">
                  Quiz
                  <button
                    className="btn btn-outline-success float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#Add-Examen"
                  >
                    <FaPlus />
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
                        <select
                          className="d-inline-block form-select form-select-sm"
                          value={pageSize}
                          onChange={handlePageSizeChange}
                        >  
                          <option value={3}>3</option>
                          <option value={6}>6</option>
                          <option value={9}>9</option>
                        </select>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      id="dataTable_filter"
                      className="text-md-end dataTables_filter"
                    >
                      <label className="form-label">
                        <input
                          className="form-control form-control-sm"
                          type="search"
                          aria-controls="dataTable"
                          placeholder="Search"
                          value={searchQuery}
                          onChange={handleSearchQueryChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {cardExamens.length > 0 ? (
                    // Render the exams
                    cardExamens
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
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredExamensData.length)} of {filteredExamensData.length}
                    </p>
                  </div>
                  <div className="col-md-6">
                    {renderPagination()}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Examens;

import React, { useEffect, useState } from 'react';
import { Sidebar, Footer, Header, Container } from '../components';
import { ToastContainer } from 'react-toastify';
import ExamSubmition from '../DatatTable/ExamSubmition'; 
import { Link, useParams } from 'react-router-dom';
// Import the ExamSubmition component

const ResultOffQuizTable = () => {
    const { examId } = useParams();
    const [data, setData] = useState([]);
    const [currentClass,setCurrentClass]=useState('');
    const [currentQuiz,setCurrentQuiz]=useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/submitExam/${examId}`);
          const result = await response.json();
          setData(result);
          setCurrentClass(result[0].exam.classe);
          setCurrentQuiz(result[0].exam.titre);
        } catch (error) {
          console.error(error);
        }
      };
  
      // Fetch data every 3 seconds
      const interval = setInterval(fetchData, 500);
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }, [examId]);

  return (
    <>
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
            <Header />

            <Container>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <Link to="/Classes">Classes</Link>
                    </li>
                    <li className="breadcrumb-item">
                    <Link to={`/Classes/${currentClass}/Examens`}>Quizs</Link>
                    </li>
                    <li className="breadcrumb-item">
                       Soumission
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {currentQuiz} {'>'}
                    </li>
                </ol>
                </nav>

              <div className="card shadow">
                <div className="card-body">
                  <div className="row">
                    <div className="col-6 align-items-center"></div>
                    <div className="col-6 float-end">
                      <div id="dataTable_filter" className="text-md-end dataTables_filter">
                        <label className="form-label">
                          <input className="form-control form-control-sm" type="search" placeholder="Search" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    id="dataTable"
                    className="table-responsive table"
                    role="grid"
                    aria-describedby="dataTable_info"
                  >
                    {/* Pass the data prop to ExamSubmition */}
                    <ExamSubmition data={data} />
                  </div>
                </div>
              </div>
            </Container>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ResultOffQuizTable;

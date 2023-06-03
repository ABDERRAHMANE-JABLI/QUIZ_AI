import React, { useEffect, useState } from 'react'
import {Sidebar, Footer, Header, Container,} from '../components';
import NavigationStduentClasses from '../ClassDetails/NavigationStduentClasses' ;
import Breadcrumb from '../ClassDetails/Broadcrumb';
import ModalInviter from '../ClassDetails/ModalInviter';
import {FaUserPlus, FaFileExcel } from 'react-icons/fa';
import TableEtudiants from '../DatatTable/Etudiants';
import exportFromJSON from 'export-from-json'  
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { getStudents } from '../../redux/apiCalls/classeApiCall';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';


const Etudiants = () => {
        const [loading, setLoading] = useState(true);
        const {idClasse} = useParams();
        const dispatch = useDispatch();
        
        useEffect(()=>{
          setTimeout(() => {
            dispatch(getStudents(idClasse));
            setLoading(false);
          }, 1000);
          
        },[idClasse]);

        const {studentsClasse} = useSelector(state => state.classe);
        const [data, setData] = useState(studentsClasse);
        

      function handleFilter(e){
        const newdata = studentsClasse.filter(row => {return (row.firstname+' '+row.lastname).toLowerCase().includes(e.target.value.toLowerCase())});
        setData(newdata);
      }

      const fileName = "Liste_Etudiants_"+new Date().toISOString().replace(/:/g,"-");
      const exportType = exportFromJSON.types.xls;
      function ExportToExcel(){  
        exportFromJSON({ data:studentsClasse,fileName,fields:["firstname", "lastname", "email", "tel"], exportType });  
      }
      
  return (
    <>
    {loading ? (
        <Loader />
      ) : (
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
          <Header/>
          <ModalInviter/>
          
          <Container>
             <Breadcrumb idClasse={idClasse}/>
            <NavigationStduentClasses/>

            <div className="card shadow">
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">les Etudiants de Classe <button className="btn btn-outline-primary float-end" data-bs-toggle="modal" data-bs-target={"#ModalInviter"}>
                  <FaUserPlus/> &nbsp; Inviter
                  </button>
                </p>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6 align-items-center">
                  <button className='btn btn-outline-success' onClick={ExportToExcel}><FaFileExcel/> To excel</button>
                  </div>
              <div className="col-6 float-end">
                <div id="dataTable_filter" className="text-md-end dataTables_filter">
                  <label className="form-label">
                    <input
                      className="form-control form-control-sm"
                      type="search"
                      onChange={handleFilter}
                      placeholder="Search"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div id="dataTable" className="table-responsive table" role="grid" aria-describedby="dataTable_info">
              <TableEtudiants data={studentsClasse}/>
            </div>
           
            </div>
          </div>
          </Container>
        </div>
        <Footer/>
      </div>
    </div>
    )}</>
  )
}

export default Etudiants
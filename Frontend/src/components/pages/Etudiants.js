import React, { useEffect, useState } from 'react'
import {Sidebar, Footer, Header, Container,} from '../components';
import NavigationStduentClasses from '../ClassDetails/NavigationStduentClasses' ;
import ModalInviter from '../ClassDetails/ModalInviter';
import {FaUserPlus, FaFileExcel } from 'react-icons/fa';
import TableEtudiants from '../DatatTable/Etudiants';
import exportFromJSON from 'export-from-json'  
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents } from '../../redux/apiCalls/classeApiCall';
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
        
        

    /*const studentdata = [
      etudiant :  {id:"1", FirstName:"John", LastName:"Doe", Email:"johndoe@example.com", Tel:"12345895", photo:"https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png"},
        {id:"2", FirstName:"Jane", LastName:"Doe", Email:"janedoe@example.com", Tel:"678907412", photo:"https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png"},
        {id:"3", FirstName:"Bob", LastName:"Smith", Email:"bobsmith@example.com", Tel:"543274121", photo:"https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png"},
        {id:"4", FirstName:"Alice", LastName:"Jones", Email:"alicejones@example.com", Tel:"098767412", photo:"https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png"},
        {id:"5", FirstName:"Alice", LastName:"Jones", Email:"alicejones@example.com", Tel:"098767412", photo:"https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png"},
        {id:"6", FirstName:"Alice", LastName:"Jones", Email:"alicejones@example.com", Tel:"098767412", photo:"https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png"},
        {id:"7", FirstName:"Alice", LastName:"Jones", Email:"alicejones@example.com", Tel:"098767412", photo:"https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png"},
        {id:"8", FirstName:"Alice", LastName:"Jones", Email:"alicejones@example.com", Tel:"098767412", photo:"https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png"},
        {id:"9", FirstName:"Karami", LastName:"jihen", Email:"alicejones@example.com", Tel:"098767412", photo:"https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png"},
      ];
      */

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
      <Sidebar/>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content"> 
          <Header/>
          <ModalInviter/>
          
          <NavigationStduentClasses/>
          <Container>
            <div className="card shadow">
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">Membres de Classe <button className="btn btn-outline-primary float-end" data-bs-toggle="modal" data-bs-target={"#ModalInviter"}>
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
import React from 'react'
import DataTable from 'react-data-table-component'
import {FaUserAltSlash} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { unSubscrib } from '../../redux/apiCalls/inscriptionApiCall'
import swal from 'sweetalert'

const TableEtudiants = (props) => {

  const dispatch = useDispatch();

    const columns = [
        {
          name:'photo',
          selector:(row) => (<img width={40} height={40} src={row.photo.url} alt={row.firstname}/>),
        },
        {
          name:'Nom et Prénom',
          selector:(row) => row.firstname+' '+row.lastname,
          sortable: true,
        },
        {
          name:'Email',
          selector: (row)=> row.email,
          sortable : true,
        },
        {
          name:'Tel',
          selector:(row)=> row.tel
        },
        {
            name:'Action',
            cell: (row)=>(<button className='btn btn-outline-danger' title='retirer cet Etudiant' onClick={()=>{swal({ title: 'Vous étes sur?', text: "Vous voulez Retirer Cet Etudiant(e)", icon: 'warning', buttons: true, dangerMode: true }).then((ok) => { if (ok) {dispatch(unSubscrib(localStorage.getItem("idClasse"), row._id)); }});}}><FaUserAltSlash/></button>)
        }
      ];

  return (
    <DataTable columns={columns} 
                data={props.data} 
                pagination 
                fixedHeader 
                fixedHeaderScrollHeight='400px'
      />
  )
}

export default TableEtudiants
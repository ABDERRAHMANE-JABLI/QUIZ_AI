import React from 'react'
import DataTable from 'react-data-table-component'
import {FaUserAltSlash} from 'react-icons/fa'


const TableEtudiants = (props) => {

    const columns = [
        {
          name:'photo',
          selector:(row) => (<img width={40} height={40} src={row.photo} alt={row.FirstName}/>),
        },
        {
          name:'Nom et Prénom',
          selector:(row) => row.FirstName+' '+row.LastName,
          sortable: true,
        },
        {
          name:'Email',
          selector: (row)=> row.Email,
          sortable : true,
        },
        {
          name:'Tel',
          selector:(row)=> row.Tel
        },
        {
            name:'Action',
            cell: (row)=>(<button className='btn btn-outline-danger' title='retirer cet Etudiant' onClick={()=>{alert('etudiant id : '+row.id)}}><FaUserAltSlash/></button>)
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
import React from 'react'
import DataTable from 'react-data-table-component'
import {FaUserAltSlash} from 'react-icons/fa'


const TableEtudiants = (props) => {

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
            cell: (row)=>(<button className='btn btn-outline-danger' title='retirer cet Etudiant' onClick={()=>{alert('etudiant id : '+row._id)}}><FaUserAltSlash/></button>)
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
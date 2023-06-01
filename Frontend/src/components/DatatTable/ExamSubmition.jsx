import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaTrash,FaEye } from 'react-icons/fa';
import swal from 'sweetalert';
import ResultOffQuizModal from '../ClassDetails/ModalSomutionDetails';

const ExamSubmition = (props) => {
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const columns = [
    {
      name: 'photo',
      selector: 'student.photo.url',
      cell: (row) => <img width="10px" height="10px" src={row.student.photo.url} alt={row.student.firstname} />,
    },
    {
      name: 'Nom  ',
      selector: (row) => `${row.student.firstname}`,
      sortable: true,
    },
    {
      name: 'Prénom',
      selector: (row) => `${row.student.lastname}`,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="justify-content-evenly bd-highlight">
        <button
          className="btn btn-outline-danger p-2 bd-highlight"
          title="retirer cet Etudiant"
          onClick={() => {
            swal({
              title: 'Vous étes sur?',
              text: 'Vous voulez Retirer ce record ?',
              icon: 'warning',
              buttons: true,
              dangerMode: true,
            }).then((ok) => {
              if (ok) {
                // Handle removing the record
              }
            });
          }}
        >
          <FaTrash />
        </button>
        <button
          className="btn btn-outline-info p-2 bd-highlight"
          title="voir Soumission"
          onClick={() => {
            setSelectedExamId(row.exam._id);
            setSelectedStudentId(row.student._id);
          }}
        >
          <FaEye />
        </button>
      </div>
      
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={props.data}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
      />
      {selectedExamId && selectedStudentId && (
        <ResultOffQuizModal
          ExamId={selectedExamId}
          studentId={selectedStudentId}
          onHide={() => {
            setSelectedExamId(null);
            setSelectedStudentId(null);
          }}
        />
      )}
    </>
  );
};

export default ExamSubmition;

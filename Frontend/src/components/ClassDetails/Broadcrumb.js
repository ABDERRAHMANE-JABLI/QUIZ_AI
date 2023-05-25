import React, { useEffect, useState } from 'react';
import { useParams, Link, BrowserRouter } from 'react-router-dom';

const Breadcrumb = (props) => {
//   const { idClasse } = useParams();
  const [classroomData, setClassroomData] = useState('');

  useEffect(() => {
    fetchClassroomData();
  }, []);

  const fetchClassroomData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/classrooms/ClassById/${props.idClasse}`
      );
      const data = await response.json();
      setClassroomData(data.titre);
    } catch (error) {
      console.log('Error fetching classroom data:', error);
    }
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/Classes">Classes</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {classroomData} {'>'}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
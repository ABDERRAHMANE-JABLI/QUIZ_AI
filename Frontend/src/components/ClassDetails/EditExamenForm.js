import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaEdit} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditerExamForm = (props) => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [duration, setDuration] = useState('');
  const [classId,setClassId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editedTitre, setEditedTitre] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDateTime, setEditedDateTime] = useState('');
  const [editedDuration, setEditedDuration] = useState('');

  useEffect(() => {
    fetchExamData();
  }, []);

  const fetchExamData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/examens/${props.id}`, {
        method: 'GET',
        // Add any necessary headers or authentication tokens
      });
      if (response.ok) {
        const data = await response.json();
        setTitre(data.titre);
        setDescription(data.description);
        setDateTime(new Date(data.Date_debut).toISOString().slice(0, 16));
        setDuration(data.Durre);
        setClassId(data.classe);
      } else {
        toast.error('Failed to fetch exam data');
      }
    } catch (error) {
      console.log('Failed to fetch exam data:', error);
    }
  };

  const handleEditButtonClick = () => {
    setEditedTitre(titre);
    setEditedDescription(description);
    setEditedDateTime(dateTime);
    setEditedDuration(duration);
    setShowModal(true);
  };

  const handleModalSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/examens/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titre: editedTitre,
          description: editedDescription,
          Date_debut: editedDateTime,
          Durre: editedDuration,
        }),
      });
      if (response.ok) {
        setShowModal(false);
        fetchExamData();
        toast.success('Exam updated successfully!');
      } else {
        toast.error('Failed to update exam');
  
      }
    } catch (error) {
      console.log('Failed to update exam:', error);
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <><nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Classes</a>
        </li>
         <li className="breadcrumb-item">
          <Link to={`/Classes/${classId}/Examens`}>Quizs</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
        {titre}
        </li>
      </ol>
    </nav>
    <div style={{ marginBottom: 8 }}>
        <div className="card">
          <div className="card-body">
            {showModal ? (
              <div>
                <h3>Edit Exam</h3>
                <div className="mb-3">
                  <label htmlFor="edited-titre" className="form-label">
                    Titre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edited-titre"
                    value={editedTitre}
                    onChange={(e) => setEditedTitre(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edited-description" className="form-label">
                    Description
                  </label>
                  <ReactQuill
                    value={editedDescription}
                    onChange={setEditedDescription}

                    modules={{
                      toolbar: {
                        // Exclude the 'header' format
                        // Other desired options can be added here
                        // Refer to the Quill documentation for available options: https://quilljs.com/docs/modules/toolbar/
                        container: [
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ list: 'ordered' }, { list: 'bullet' }],
                          ['link'],
                        ],
                      },
                    }}
                    formats={[
                      // Exclude the 'header' format
                      // Other desired formats can be added here
                      // Refer to the Quill documentation for available formats: https://quilljs.com/docs/formats/
                      'bold',
                      'italic',
                      'underline',
                      'strike',
                      'list',
                      'bullet',
                      'link',
                    ]} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edited-date-debut" className="form-label">
                    Date de début
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="edited-date-debut"
                    value={editedDateTime}
                    onChange={(e) => setEditedDateTime(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edited-duree" className="form-label">
                    Durée
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edited-duree"
                    value={editedDuration}
                    onChange={(e) => setEditedDuration(e.target.value)} />
                </div>
                <button className="btn btn-primary float-end" onClick={handleModalSave}>
                  Save
                </button>

                <button className="btn btn-secondary float-end" style={{ marginRight: '10px' }} onClick={handleModalCancel}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <button className="btn  float-end " onClick={handleEditButtonClick}>
                  <FaEdit />
                </button>
                <br />
                <div className="mb-3">
                  <label htmlFor="edited-titre" className="form-label">
                    Titre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edited-titre"
                    value={titre}
                    // onClick={handleEditButtonClick}
                    readOnly />
                </div>
                <div className="mb-3">
                  <label htmlFor="edited-description" className="form-label">
                    Description
                  </label>
                  <div
                    className="form-control"
                    id="edited-description"
                    // onClick={handleEditButtonClick}
                    dangerouslySetInnerHTML={{ __html: description }}
                    readOnly />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="date-debut" className="form-label">
                        Date de début
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="date-debut"
                        value={dateTime}
                        readOnly={true} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="duree" className="form-label">
                        Durée
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="duree"
                        value={duration}
                        readOnly={true} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div></>
  );
};

export default EditerExamForm;

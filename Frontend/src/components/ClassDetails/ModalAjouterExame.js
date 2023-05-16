import React, {useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';


const ModalIjouterExamen = () => {
  const [examTitle, setExamTitle] = useState('');
  const [examDescription, setExamDescription] = useState('');
  const [examDuration, setExamDuration] = useState(60);
  const [numQuestions, setNumQuestions] = useState(10);
 
  const handleExamTitleChange = (event) => {
    setExamTitle(event.target.value);
  };

  const handleExamDescriptionChange = (event) => {
    setExamDescription(event.target.value);
  };

  const handleExamDurationChange = (event) => {
    setExamDuration(parseInt(event.target.value));
  };

  const handleNumQuestionsChange = (event) => {
    setNumQuestions(parseInt(event.target.value));
  };
  const navigate = useNavigate();
  useEffect(() => {
    $('#Add-Examen').on('hidden.bs.modal', () => {
      setExamTitle('');
      setExamDescription('');
      setExamDuration(0);
      setNumQuestions(0);
    });
  }, []);

const handleFormSubmit = async (event) => {
  event.preventDefault();
  // Perform any necessary actions with the form data
  const formData = {
    examTitle,
    examDescription,
    examDuration,
    numQuestions,
  };

  // Display a loading toast
  const loadingToastId = toast.loading('we are generting the quiz...', { autoClose: false });


  try {
    // Make a POST request using Axios
    const response = await axios.post('http://localhost:8000/api/GenerateExamen', { "NbQuestion": numQuestions, "sujet": examDescription });
    // Handle the response
    toast.update(loadingToastId, { render: 'Quiz genreted successfully!', type: toast.TYPE.SUCCESS, autoClose: false });

    const data = response.data;
    const jsonData = JSON.parse(`${data}`);
    console.log(jsonData);

    

    // Display a success toast

    // close modal by jquery here
    $('#closeBtn').click();
    navigate('/editer/examens', { state: { jsonData } });
    // Clear the form fields
  } catch (error) {
    // Display an error toast
    toast.update(loadingToastId, { render: 'Error submitting form. Please try again.', type: toast.TYPE.ERROR ,autoClose: true});
    console.error('Form submission error:', error);
  }
};

  
  // In your component, get the history object using useHistory
  
  

  return (
    <div id="Add-Examen" className="modal fade" role="dialog" tabIndex={-1}  aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
      {/* Modal content */}
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {/* Modal header */}
          <div className="modal-header">
            <h4 className="modal-title">&nbsp; Création d'un nouvel examen</h4>
            <button
              id='closeBtn'
              className="btn-close"
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
            />
          </div>

          {/* Modal body */}
          <form onSubmit={handleFormSubmit}>
            <div className="modal-body">
              <div className="container">
                {/* Exam title */}
                <div className="mb-3">
                  <label className="form-label form-label" htmlFor="exam-title">
                    Titre de L'examen
                  </label>
                  <input
                    id="exam-title"
                    className="form-control"
                    type="text"
                    value={examTitle}
                    onChange={handleExamTitleChange}
                  />
                </div>

                {/* Exam description */}
                <div className="mb-3">
                  <label className="form-label form-label" htmlFor="exam-description">
                    Description de l'examen
                  </label>
                  <textarea
                    id="exam-description"
                    className="form-control"
                    rows={3}
                    value={examDescription}
                    onChange={handleExamDescriptionChange}
                  />
                </div>

                {/* Exam duration */}
                <div className="mb-3">
                  <label className="form-label form-label" htmlFor="exam-duration">
                    Durée de l'examen (en minutes)
                  </label>
                  <input
                    id="exam-duration"
                    className="form-control"
                    type="number"
                    value={examDuration}
                    onChange={handleExamDurationChange}
                  />
                </div>

                {/* Number of questions */}
                <div className="mb-3">
                  <label className="form-label form-label" htmlFor="num-questions">
                    Nombre de question
                    </label>
              <input
                id="num-questions"
                className="form-control"
                type="number"
                value={numQuestions}
                onChange={handleNumQuestionsChange}
              />
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="modal-footer">
          <button className="btn btn-light" type="button" data-bs-dismiss="modal">
            Fermer
          </button>
          <button className="btn btn-primary" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
);
};

export default ModalIjouterExamen;

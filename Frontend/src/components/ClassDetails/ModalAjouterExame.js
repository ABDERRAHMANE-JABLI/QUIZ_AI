import React, {useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import { useParams } from 'react-router-dom';


const ModalIjouterExamen = () => {
  const { idClasse } = useParams();
  const [examTitle, setExamTitle] = useState('');
  const [examDescription, setExamDescription] = useState('');
  const [examDuration, setExamDuration] = useState(0);
  const [numQuestions, setNumQuestions] = useState(0);
  const [Date_debut,setDate_debut] = useState();
  
  const handleDate_debutChange = (event) => {
    setDate_debut(event.target.value);
  };
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
    const response = await axios.post('http://localhost:8000/api/examens/GenerateExamen', { "NbQuestion": numQuestions, "sujet": examDescription });
    // Handle the response
    toast.update(loadingToastId, { render: 'Quiz genreted successfully!', type: toast.TYPE.SUCCESS, autoClose: true });

    const data = response.data;
    const JsonData = JSON.parse(`${data}`);
    // console.log(jsonData);

    toast.update(loadingToastId, { render: 'wait will storing the data ', type: toast.TYPE.SUCCESS, autoClose: false });
    const examen = await axios.post('http://localhost:8000/api/examens', {
      "titre":examTitle,
      "description":examDescription,
      "Date_debut":Date_debut,
      "Durre":examDuration,
      "classe":idClasse
  
  });
  for (const question of JsonData) {
    const responseCreatedQuestion = await axios.post('http://localhost:8000/api/questions', {
      "titre": question.questionText,
      "note": 0,
      "type": question.questionType,
      "Exam": examen.data._id
    });
  
    toast.update(loadingToastId, { render: `Question created successfully ${responseCreatedQuestion.data.titre}`, type: toast.TYPE.SUCCESS, autoClose: false });
  
    if (Array.isArray(question.answers)) {
      for (const answer of question.answers) {
        console.log(answer);
        const responseCreatedAnswer = await axios.post('http://localhost:8000/api/answers', {
          "titre": answer.text,
          "note": 0,
          "correct": answer.correct,
          "question": responseCreatedQuestion.data._id
        });
  
        toast.update(loadingToastId, { render: `Answer created successfully ${responseCreatedAnswer.data.titre}`, type: toast.TYPE.SUCCESS, autoClose: false });
      }
    } else {
      console.log("Answers is not an array for question ID: " + question.id);
    }
  }
  toast.update(loadingToastId, { render: 'Please wait while we redirect you to the list of questions', type: toast.TYPE.INFO, autoClose: false });

  // Simulate a delay before navigating to the list of questions
  setTimeout(() => {
    // Perform the navigation here
    // For example:
    toast.dismiss(loadingToastId);
    $('#closeBtn').click();
    navigate(`/editer/examens/${examen.data._id}`);
  }, 3000);
  
  //  console.log(examen.data);
     
    

    // Display a success toast

    // close modal by jquery here
    
    // Clear the form fields
  } catch (error) {
    // Display an error toast
    toast.update(loadingToastId, { render: error, type: toast.TYPE.ERROR ,autoClose: true});
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
                  <label className="form-label form-label" htmlFor="Date_debut">
                    Date du debut
                  </label>
                  <input
                    id="Date_debut"
                    className="form-control"
                    type="datetime-local"
                    value={Date_debut}
                    onChange={handleDate_debutChange}
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
                    min={0}
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
                min={0}
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
